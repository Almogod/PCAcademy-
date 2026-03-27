/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: interactivecalculators
 * Interface for InteractiveCalculators
 */
export interface InteractiveCalculators {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  calculatorName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  toolSlug?: string;
  thumbnailImage?: string;
  /** @wixFieldType text */
  conceptsCovered?: string;
}


/**
 * Collection ID: pcaconcepts
 * Interface for PCAConcepts
 */
export interface PCAConcepts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  conceptTitle?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedExplanation?: string;
  visualAssetUrl?: string;
  /** @wixFieldType number */
  sequenceNumber?: number;
}


/**
 * Collection ID: realworldexamples
 * Interface for RealWorldExamples
 */
export interface RealWorldExamples {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  applicationTitle?: string;
  /** @wixFieldType text */
  domainField?: string;
  /** @wixFieldType text */
  caseStudyDescription?: string;
  illustrationImage?: string;
  /** @wixFieldType text */
  keyTakeaways?: string;
}


/**
 * Collection ID: referencematerials
 * Interface for ReferenceMaterials
 */
export interface ReferenceMaterials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceTitle?: string;
  /** @wixFieldType text */
  resourceType?: string;
  resourceLink?: string;
  /** @wixFieldType text */
  authorSource?: string;
  /** @wixFieldType text */
  shortDescription?: string;
}


/**
 * Collection ID: visualdemonstrations
 * Interface for VisualDemonstrations
 */
export interface VisualDemonstrations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  demonstrationTitle?: string;
  /** @wixFieldType text */
  instructions?: string;
  /** @wixFieldType text */
  demoType?: string;
  previewImage?: string;
  demoUrl?: string;
  /** @wixFieldType text */
  complexityLevel?: string;
}
