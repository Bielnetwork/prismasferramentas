# Imagens do PRISMA

Os PNGs desta pasta são os arquivos originais e também funcionam como fallback.
As versões WebP responsivas usadas pelo navegador ficam em `optimized/`.

Os caminhos públicos continuam centralizados em `src/config.ts`. Ao substituir uma
imagem, mantenha o mesmo nome do PNG e gere novamente as versões WebP de 640 px,
960 px (quando aplicável) e largura integral.

As dimensões correspondentes ficam em `imageDimensions`, no início de
`src/App.tsx`. Atualize-as quando a resolução de um original mudar. Mantenha os
mapas em boa resolução para que continuem legíveis na ampliação.
