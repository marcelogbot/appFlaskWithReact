from flask import Flask
from PyPDF2 import PdfReader
import re

app = Flask(__name__)

@app.route("/")
def home():

    return 'Tela inicial'

# Conteudo
@app.route("/contentPDF")
def conteudo(): 
    arquivo_pdf_novo = "C:\\Users\\marce\\Documents\\INFORME.pdf"
    print('O arquivo é '+ arquivo_pdf_novo)
    conteudo = "Sem arquivo para ler"
    if arquivo_pdf_novo != "":
        try:
            pdf_file = open(arquivo_pdf_novo, 'rb')
            read_pdf = PdfReader(pdf_file)
            number_of_pages = read_pdf.getNumPages()
            page_content = '<h1><b>Conteúdo do Arquivo PDF</b></h1>'

            for page_pdf in read_pdf.pages:
                page = page_pdf
                page_content += '<p>'+page_pdf.extractText()+'</p>'

            parsed = ''.join(page_content)
            #parsed = re.sub('\n', '', parsed)

            conteudo = parsed  

        except Exception as error:
            print('Deu ruim!' + error.__str__())
        
    return conteudo.__str__()


if __name__ == "__main__":
    app.run(debug=True)








