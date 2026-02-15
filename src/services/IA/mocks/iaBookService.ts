import { AIMapResponse } from '@/domain/schemes/maps/bookmap-scheme';
import bookmapMock from '@/services/IA/mocks/bookmap.json'

export async function createBookmap(theme: string): Promise<AIMapResponse> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return bookmapMock as AIMapResponse;
}