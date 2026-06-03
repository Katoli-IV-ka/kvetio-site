import { describe, expect, it } from 'vitest';
import {
  dataTypes,
  heroCopy,
  qualityPoints,
  sampleDatasets,
  services,
  trustSignals,
  useCases,
  workflowSteps,
} from '../../shared/landing/content';

describe('landing page content', () => {
  it('keeps the hero message short and specific', () => {
    expect(heroCopy.title).toBe('Custom AI Training Data, Produced and Annotated for Your Model');
    expect(heroCopy.description).toBe(
      'Training datasets — collected, produced, annotated, and delivered in your format.',
    );
  });

  it('positions Kvetio as a multi-domain data provider, not only photo and video', () => {
    expect(trustSignals).toContain('Multi-domain data');
    expect(trustSignals).not.toContain('Photo & video first');
    expect(services.map((service) => service.title)).toContain('Data Production');
    expect(dataTypes.map((type) => type.title)).toEqual([
      'Visual Data',
      'Audio & Speech',
      'Text & Documents',
      'Sensor & Structured Data',
      'Domain-Specific Data',
    ]);
    expect(dataTypes.map((type) => type.icon)).toEqual([
      'visual',
      'audio',
      'document',
      'sensor',
      'domain',
    ]);
    expect(sampleDatasets.map((dataset) => dataset.title)).toContain('Speech & Audio Events');
    expect(sampleDatasets.map((dataset) => dataset.visual)).toEqual([
      'action-video',
      'object-images',
      'audio-events',
      'domain-dataset',
    ]);
    expect(useCases.map((useCase) => useCase.title)).toEqual([
      'Computer Vision',
      'Multimodal AI',
      'Speech & Audio AI',
      'NLP & Document AI',
      'Robotics & Sensor AI',
      'Domain AI',
    ]);
  });

  it('contains the core sections required for the redesigned landing page', () => {
    expect(trustSignals).toHaveLength(5);
    expect(services).toHaveLength(4);
    expect(sampleDatasets).toHaveLength(4);
    expect(dataTypes).toHaveLength(5);
    expect(workflowSteps.map((step) => step.title)).toEqual([
      'Brief',
      'Data Spec',
      'Production',
      'Rights',
      'Annotation',
      'QA',
      'Delivery',
    ]);
    expect(useCases).toHaveLength(6);
    expect(qualityPoints.length).toBeGreaterThanOrEqual(6);
  });
});
