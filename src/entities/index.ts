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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
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
  /** @wixFieldType url */
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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
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
  /** @wixFieldType url */
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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  previewImage?: string;
  /** @wixFieldType url */
  demoUrl?: string;
  /** @wixFieldType text */
  complexityLevel?: string;
}
