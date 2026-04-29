def summarize(text):
    if not text:
        return "Sem conteúdo disponível"
    return text[:120] + "..."