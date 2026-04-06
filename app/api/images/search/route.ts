import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const perPage = searchParams.get("per_page") ?? "12";

  if (!query) {
    return NextResponse.json({ error: "Query obrigatória" }, { status: 400 });
  }

  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key não configurada" }, { status: 500 });
  }

  const url = new URL("https://pixabay.com/api/");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("q", query);
  url.searchParams.set("image_type", "illustration");
  url.searchParams.set("safesearch", "true");
  url.searchParams.set("per_page", perPage);
  url.searchParams.set("lang", "pt");

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    return NextResponse.json({ error: "Erro ao buscar imagens" }, { status: 502 });
  }

  const data = await res.json();

  const images = data.hits.map((hit: {
    id: number;
    webformatURL: string;
    previewURL: string;
    tags: string;
    pageURL: string;
  }) => ({
    id: hit.id,
    url: hit.webformatURL,
    preview: hit.previewURL,
    tags: hit.tags,
    pageURL: hit.pageURL,
  }));

  return NextResponse.json({ images, total: data.totalHits });
}
