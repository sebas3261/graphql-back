import { CatRepository } from "../../domain/ports/CatRepository";
import { Cat } from "../../domain/entities/Cat";

// Si usas Node < 18, descomenta y `npm i cross-fetch`:
// import fetch from "cross-fetch";

const BASE_URL = process.env.CAT_API_BASE_URL || "https://api.thecatapi.com/v1";
const API_KEY  = process.env.CAT_API_KEY;

async function callCatApi(pathWithQuery: string) {
  const url = `${BASE_URL}${pathWithQuery}`;
  const headers: Record<string, string> = {};
  if (API_KEY) headers["x-api-key"] = API_KEY; // recomendado

  const resp = await fetch(url, { headers });
  if (!resp.ok) throw new Error(`Cat API ${resp.status} ${resp.statusText}`);
  return resp.json();
}

export class CatApiImagesRepository implements CatRepository {
  async getRandom(limit: number): Promise<Cat[]> {
    // GET /v1/images/search?limit=10
    const data = await callCatApi(`/images/search?limit=${encodeURIComponent(String(limit))}`);
    return data.map((x: any) => ({
      id: x.id,
      url: x.url,
      width: x.width,
      height: x.height,
      breedId: x.breeds?.[0]?.id
    } as Cat));
  }

  async getByBreed(breedId: string, limit: number): Promise<Cat[]> {
    // GET /v1/images/search?limit=10&breed_ids=beng
    const data = await callCatApi(
      `/images/search?limit=${encodeURIComponent(String(limit))}&breed_ids=${encodeURIComponent(breedId)}`
    );
    return data.map((x: any) => ({
      id: x.id,
      url: x.url,
      width: x.width,
      height: x.height,
      breedId: breedId
    } as Cat));
  }
}
