import { DocumentRecallToolOptions } from './type';
import { commonHttpInstance } from '../../../utils/http-instance';

export const recallDeveloperDocument = async (query: string, options: DocumentRecallToolOptions) => {
  try {
    const { domain, count = 3 } = options;
    // Get Feishu search API endpoint
    const searchEndpoint = `${domain}/document_portal/v1/recall`;
    const payload = {
      question: query,
    };
    // Send network request to Feishu search API
    const response = await commonHttpInstance.post(searchEndpoint, payload, {
      timeout: 10000,
    });

    // Process search results
    let results = response.data.chunks || [];
    return results.slice(0, count);
  } catch (error) {
    throw error;
  }
};
