import { iaBookmapData } from '@/domain/entities/maps/maps';
import bookmapMock from '@/services/IA/mocks/bookmap.json'

export async function createBookmap(theme: string): Promise<iaBookmapData> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return bookmapMock as iaBookmapData;
}