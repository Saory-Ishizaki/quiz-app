import pandas as pd
import json

def converter_excel_para_json(nome_arquivo, nivel, peso):
    try:
        # Ler arquivo Excel
        df = pd.read_excel(nome_arquivo)
        
        perguntas = []
        for i, row in df.iterrows():
            # Supondo que suas colunas sejam: Pergunta, A, B, C, D, Resposta
            pergunta = {
                "id": i + 1,
                "pergunta": row['Pergunta'],
                "opcoes": [
                    f"A) {row['A']}",
                    f"B) {row['B']}",
                    f"C) {row['C']}",
                    f"D) {row['D']}"
                ],
                "resposta": row['Resposta'].strip().upper(),
                "peso": peso
            }
            perguntas.append(pergunta)
        
        return perguntas
        
    except Exception as e:
        print(f"Erro ao processar {nome_arquivo}: {e}")
        return []

# Converter cada nível
facil = converter_excel_para_json('perguntas_facil.xlsx', 'facil', 1)
moderado = converter_excel_para_json('perguntas_medio.xlsx', 'moderado', 2)
dificil = converter_excel_para_json('perguntas_dificil.xlsx', 'dificil', 3)

# Criar arquivo JSON final
dados_json = {
    "facil": facil,
    "moderado": moderado, 
    "dificil": dificil
}

# Salvar em arquivo
with open('backend/perguntas.json', 'w', encoding='utf-8') as f:
    json.dump(dados_json, f, ensure_ascii=False, indent=2)

print("✅ Arquivo perguntas.json criado com sucesso na pasta backend!")
print(f"📊 Estatísticas: Fácil: {len(facil)}, Moderado: {len(moderado)}, Difícil: {len(dificil)}")