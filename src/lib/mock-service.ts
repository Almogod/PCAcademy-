import { 
  ReferenceMaterials, 
  PCAConcepts, 
  RealWorldExamples, 
  InteractiveCalculators, 
  VisualDemonstrations 
} from '@/entities';

// Mock data for References
const mockReferences: ReferenceMaterials[] = [
  {
    _id: '1',
    resourceTitle: 'Principal Component Analysis: A Tutorial',
    resourceType: 'paper',
    authorSource: 'Jonathon Shlens',
    shortDescription: 'A clear and concise tutorial covering the mathematical foundations and extensions of PCA.',
    resourceLink: 'https://arxiv.org/abs/1404.1100'
  },
  {
    _id: '2',
    resourceTitle: 'Pattern Recognition and Machine Learning',
    resourceType: 'book',
    authorSource: 'Christopher Bishop',
    shortDescription: 'A comprehensive textbook with a detailed chapter on dimensionality reduction and PCA.',
    resourceLink: 'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/'
  }
];

// Mock data for Concepts
const mockConcepts: PCAConcepts[] = [
  {
    _id: '1',
    conceptTitle: 'Variance and Covariance',
    shortDescription: 'Understand how spread out data is and how variables change together.',
    detailedExplanation: 'Variance measures the spread of data around its mean...',
    sequenceNumber: 1
  }
];

// Mock data for Examples
const mockExamples: RealWorldExamples[] = [
  {
    _id: '1',
    applicationTitle: 'Facial Recognition (Eigenfaces)',
    domainField: 'Computer Vision',
    caseStudyDescription: 'How PCA is used to identify common features in human faces for recognition tasks.',
    keyTakeaways: 'Dimensionality reduction in image processing saves computation time.'
  }
];

export const BaseCrudService = {
  getAll: async <T>(collectionName: string): Promise<{ items: T[] }> => {
    console.log(`Fetching from mock service: ${collectionName}`);
    let items: any[] = [];
    
    switch (collectionName.toLowerCase()) {
      case 'referencematerials':
        items = mockReferences;
        break;
      case 'pcaconcepts':
      case 'educationalconcepts':
        items = mockConcepts;
        break;
      case 'realworldexamples':
      case 'practicalexamples':
        items = mockExamples;
        break;
      // Add more cases as needed
      default:
        items = [];
    }
    
    return { items: items as T[] };
  }
};
