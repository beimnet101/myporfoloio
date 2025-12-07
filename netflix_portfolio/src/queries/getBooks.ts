// queries/getBooks.ts
import datoCMSClient from './datoCMSClient';
import { Book } from '../types';

const GET_BOOKS = `
  query {
    allBooks(orderBy: title_ASC) {
      title
      author
      description
      image {
        url
      }
    }
  }
`;

export async function getBooks(): Promise<Book[]> {
  const data = await datoCMSClient.request<{ allBooks: Book[] }>(GET_BOOKS);
  return data.allBooks;
}

