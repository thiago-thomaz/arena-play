<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BLINDAGEM E ISOLAMENTO DO ARENA PLAY

1. **Escopo Restrito (Workspace Confinement):**
   - Todas as operações (leitura, escrita, execução de terminal, testes) DEVEM acontecer estritamente dentro deste diretório (`Arena Play`).
   - NUNCA acesse, leia, altere ou execute comandos em diretórios-irmãos localizados em `AntiGravity - Projetos`.
   - NUNCA suba para diretórios pais (`..`) ou modifique arquivos fora desta pasta.

2. **Isolamento de Ambiente e Portas:**
   - Variáveis de ambiente deste projeto pertencem exclusivamente a `.env.local` / `.env`.
   - Nenhum outro projeto pode compartilhar chaves, portas ou instâncias de banco com este.
   - Porta padrão do servidor dev Next.js: se houver conflito com porta 3000 em uso por outro projeto, o Next.js aloca automaticamente a próxima (3001, 3002...) ou use porta dedicada.

3. **Integridade de Dependências e Build:**
   - As dependências são travadas via `package-lock.json` e `node_modules` locais.
   - NUNCA rode comandos globais com `-g` que possam afetar outros projetos ou permitir que outros projetos afetem o Arena Play.
   - Todo build e lint deve ser validado localmente neste diretório antes de finalizar tarefas.
