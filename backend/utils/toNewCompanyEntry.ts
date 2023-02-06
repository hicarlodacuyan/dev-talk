import { CompanyDocument } from '../types/company';

// function isString(text: unknown): text is string {
//   return typeof text === 'string';
// }

// function parseContent(content: unknown): string {
//   if (!content || !isString(content)) {
//     throw new Error('Incorrect or missing content');
//   }

//   return content;
// }

// function isNumber(num: unknown): num is number {
//   return typeof num === 'number';
// }

// function parseLikes(likes: unknown): number {
//   if (!likes || !isNumber(likes)) {
//     throw new Error('Incorrect or missing value');
//   }

//   return likes;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toNewCompanyEntry(obj: any): CompanyDocument {
  const newCompany: CompanyDocument = {
    description: obj.description as string,
    user: '63db41b3369d4b132071d2b6',
    likes: obj.likes as number
  };

  return newCompany;
}

export default toNewCompanyEntry;
