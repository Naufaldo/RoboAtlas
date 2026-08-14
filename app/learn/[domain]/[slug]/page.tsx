import React from 'react';
import { notFound } from 'next/navigation';
import { getLesson, getAllLessons } from '@/lib/mdx/content';
import { LessonPageClient } from './LessonPageClient';

interface LessonPageProps {
  params: {
    domain: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const enLessons = getAllLessons('en');
  const idLessons = getAllLessons('id');
  const allLessons = [...enLessons, ...idLessons];

  const paramsMap = new Map<string, { domain: string; slug: string }>();

  for (const lesson of allLessons) {
    const domain = lesson.frontmatter.category;
    const slug = lesson.frontmatter.slug;
    const key = `${domain}___${slug}`;
    if (!paramsMap.has(key)) {
      paramsMap.set(key, { domain, slug });
    }
  }

  return Array.from(paramsMap.values());
}

export default function LessonPage({ params }: LessonPageProps) {
  const enLesson = getLesson('en', params.domain, params.slug);
  const idLesson = getLesson('id', params.domain, params.slug);

  if (!enLesson && !idLesson) {
    notFound();
  }

  return (
    <LessonPageClient
      domain={params.domain}
      slug={params.slug}
      enLesson={enLesson}
      idLesson={idLesson}
    />
  );
}
