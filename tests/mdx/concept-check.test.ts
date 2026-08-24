import { describe, it, expect } from 'vitest';
import { getAllLessons } from '@/lib/mdx/content';

function unescapeString(str: string): string {
  return str
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\')
    .replace(/\\n/g, '\n');
}

interface ParsedQuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface ParsedConceptCheck {
  id: string;
  question: string;
  options: ParsedQuizOption[];
  hint?: string;
}

function parseConceptCheckBlock(block: string, keyIndex: number): ParsedConceptCheck | null {
  const idMatch = block.match(/id\s*=\s*["']([^"']+)["']/);
  const id = idMatch ? idMatch[1] : `concept-check-${keyIndex}`;

  let question = '';
  const questionMatch = block.match(
    /question\s*=\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|\{`((?:[^`\\]|\\.)*)`\}|\{"((?:[^"\\]|\\.)*)"\})/
  );
  if (questionMatch) {
    question = (questionMatch[1] ?? questionMatch[2] ?? questionMatch[3] ?? questionMatch[4] ?? '').trim();
    question = unescapeString(question);
  } else {
    const qIndex = block.indexOf('question="');
    if (qIndex !== -1) {
      const rest = block.slice(qIndex + 10);
      const endQ = rest.indexOf('"\n') !== -1 ? rest.indexOf('"\n') : rest.indexOf('"');
      if (endQ !== -1) {
        question = unescapeString(rest.slice(0, endQ).trim());
      }
    }
  }

  let hint: string | undefined = undefined;
  const hintMatch = block.match(
    /hint\s*=\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|\{`((?:[^`\\]|\\.)*)`\}|\{"((?:[^"\\]|\\.)*)"\})/
  );
  if (hintMatch) {
    const rawHint = (hintMatch[1] ?? hintMatch[2] ?? hintMatch[3] ?? hintMatch[4] ?? '').trim();
    if (rawHint) {
      hint = unescapeString(rawHint);
    }
  }

  const options: ParsedQuizOption[] = [];
  const optionsStartIdx = block.indexOf('options=');
  if (optionsStartIdx !== -1) {
    const optionsChunk = block.slice(optionsStartIdx);
    const arrayMatch = optionsChunk.match(/options\s*=\s*\{\[\s*([\s\S]*?)\s*\]\}/);
    const targetBlock = arrayMatch ? arrayMatch[1] : optionsChunk;

    const itemRegex = /\{([\s\S]*?)\}/g;
    let itemMatch: RegExpExecArray | null;
    while ((itemMatch = itemRegex.exec(targetBlock)) !== null) {
      const itemBody = itemMatch[1];
      const itemIdMatch = itemBody.match(/id\s*:\s*["']([^"']+)["']/);
      const isCorrectMatch = itemBody.match(/isCorrect\s*:\s*(true|false)/i);
      const itemTextMatch = itemBody.match(
        /text\s*:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)/
      );
      const explMatch = itemBody.match(
        /explanation\s*:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`)/
      );

      if (itemIdMatch) {
        const optId = itemIdMatch[1];
        let optText = '';
        if (itemTextMatch) {
          optText = (itemTextMatch[1] ?? itemTextMatch[2] ?? itemTextMatch[3] ?? '').trim();
        }
        const isCorrect = isCorrectMatch ? isCorrectMatch[1].toLowerCase() === 'true' : false;
        let explanation = '';
        if (explMatch) {
          explanation = (explMatch[1] ?? explMatch[2] ?? explMatch[3] ?? '').trim();
        }

        options.push({
          id: optId,
          text: unescapeString(optText),
          isCorrect,
          explanation: unescapeString(explanation),
        });
      }
    }
  }

  if (!question || options.length === 0) {
    return null;
  }

  return { id, question, options, hint };
}

describe('ConceptCheck MDX Parsing Verification', () => {
  it('should parse user math-foundations quiz successfully', () => {
    const rawSnippet = `<ConceptCheck
  id="quiz-math-foundations"
  question="Jika vektor a = [3, 4] dan vektor b = [4, -3], berapakah hasil perkalian titik (dot product) a . b?"
  options={[
    {
      id: "A",
      text: "0 (Kedua vektor saling tegak lurus / ortogonal).",
      isCorrect: true,
      explanation: "Tepat! a . b = (3 * 4) + (4 * -3) = 12 - 12 = 0."
    },
    {
      id: "B",
      text: "25",
      isCorrect: false,
      explanation: "Salah."
    },
    {
      id: "C",
      text: "7",
      isCorrect: false,
      explanation: "Salah."
    }
  ]}
  hint="Hitung a_x * b_x + a_y * b_y."
/>`;

    const parsed = parseConceptCheckBlock(rawSnippet, 0);
    expect(parsed).not.toBeNull();
    expect(parsed?.id).toBe('quiz-math-foundations');
    expect(parsed?.question).toContain('hasil perkalian titik');
    expect(parsed?.options.length).toBe(3);
    expect(parsed?.options[0].id).toBe('A');
    expect(parsed?.options[0].isCorrect).toBe(true);
    expect(parsed?.options[0].explanation).toContain('Tepat!');
    expect(parsed?.hint).toBe('Hitung a_x * b_x + a_y * b_y.');
  });

  it('should successfully parse ConceptCheck from all Indonesian & English lessons', () => {
    const allLessons = [...getAllLessons('id'), ...getAllLessons('en')];
    let totalChecksFound = 0;
    let totalChecksParsed = 0;

    for (const lesson of allLessons) {
      const rawLines = lesson.content.split('\n');
      let i = 0;
      while (i < rawLines.length) {
        const line = rawLines[i].trim();
        if (line.startsWith('<ConceptCheck')) {
          totalChecksFound++;
          let block = line;
          while (
            i < rawLines.length &&
            !rawLines[i].includes('/>') &&
            !rawLines[i].includes('</ConceptCheck>')
          ) {
            i++;
            if (i < rawLines.length) {
              block += '\n' + rawLines[i];
            }
          }
          if (i < rawLines.length) {
            i++;
          }

          const parsed = parseConceptCheckBlock(block, i);
          if (parsed && parsed.options.length >= 2) {
            totalChecksParsed++;
          } else {
            console.error(`Failed to parse ConceptCheck in lesson: ${lesson.frontmatter.id}`, block);
          }
          continue;
        }
        i++;
      }
    }

    expect(totalChecksFound).toBeGreaterThan(50);
    expect(totalChecksParsed).toBe(totalChecksFound);
  });
});
