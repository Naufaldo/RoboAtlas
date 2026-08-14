import React from 'react';
import { notFound } from 'next/navigation';
import { DOMAIN_REGISTRY, LESSON_REGISTRY } from '@/lib/curriculum/registry';
import { DomainOverviewClient } from './DomainOverviewClient';

interface DomainPageProps {
  params: {
    domain: string;
  };
}

export function generateStaticParams() {
  return DOMAIN_REGISTRY.map((domain) => ({
    domain: domain.slug,
  }));
}

export default function DomainPage({ params }: DomainPageProps) {
  const domainItem = DOMAIN_REGISTRY.find((d) => d.slug === params.domain);

  if (!domainItem) {
    notFound();
  }

  // Retrieve all lessons registered under this domain
  const lessons = LESSON_REGISTRY.filter((l) => l.domain === params.domain);

  return <DomainOverviewClient domain={domainItem} lessons={lessons} />;
}
