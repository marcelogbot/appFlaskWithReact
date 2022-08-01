from flask import Flask
import PyPDF2
import re

app = Flask(__name__)

@app.route("/")
def home():

    return {'Tela inicial':'Tela inicial'}

# Conteudo
@app.route("/contentPDF")
def conteudo():
    #arquivo_pdf_novo = "C:\\Users\\marce\\Desktop\\Projetos VSCode\\DocsTestRead\\CCMEI-34729557000180.pdf"
    #arquivo_pdf_novo = ""
    arquivo_pdf_novo = novoArquivo("")
    conteudo = "Sem arquivo para ler"
    if arquivo_pdf_novo != "":
        pdf_file = open(arquivo_pdf_novo, 'rb')
        read_pdf = PyPDF2.PdfFileReader(pdf_file)
        number_of_pages = read_pdf.getNumPages()
        page = read_pdf.getPage(0)
        page_content = page.extractText()
        parsed = ''.join(page_content)
        #parsed = re.sub('n', '', parsed)

        conteudo = parsed    
    return {"conteudo": [conteudo.__str__()]}
    #return {"conteudo": ["Conteudo 1","Conteudo 2","teste 3","Teste 4"]}


def novoArquivo(caminhoEnviado):
    print('esse é o caminho:', caminhoEnviado)
    if caminhoEnviado == "":
        return "C:\\Users\\marce\\Desktop\\Projetos VSCode\\DocsTestRead\\CCMEI-34729557000180.pdf"
    else:
        return caminhoEnviado

if __name__ == "__main__":
    app.run(debug=True)








