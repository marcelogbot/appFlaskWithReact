import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc, asc
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost/appTest'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Artigos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100))
    conteudo = db.Column(db.Text())
    data = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, titulo, conteudo):
        self.titulo = titulo
        self.conteudo = conteudo

class ArtigoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'titulo', 'conteudo', 'data')

artigo_schema = ArtigoSchema()
artigos_schema = ArtigoSchema(many=True)

@app.route('/get',methods = ['GET'])
def get_artigos():
    todos_artigos = Artigos.query.order_by(asc(Artigos.id)).all()
    resultados = artigos_schema.dump(todos_artigos)

    return jsonify(resultados)

@app.route('/get/<id>/',methods = ['GET'])
def post_detalhes(id):
    artigo = Artigos.query.get(id)
    return artigo_schema.jsonify(artigo)

@app.route('/update/<id>/',methods = ['PUT'])
def update_artigo(id):
    artigo = Artigos.query.get(id)

    titulo = request.json['titulo']
    conteudo = request.json['conteudo']

    artigo.titulo = titulo
    artigo.conteudo = conteudo

    db.session.commit()
    return artigo_schema.jsonify(artigo)

@app.route('/delete/<id>/',methods = ['DELETE'])
def delete_artigo(id):
    artigo = Artigos.query.get(id)
    db.session.delete(artigo)
    db.session.commit()

    return artigo_schema.jsonify(artigo)


@app.route('/add',methods = ['POST'])
def add_artigo():
    titulo = request.json['titulo']
    conteudo = request.json['conteudo']

    artigos = Artigos(titulo, conteudo)
    db.session.add(artigos)
    db.session.commit()
    return artigo_schema.jsonify(artigos)


if __name__ == "__main__":
    app.run(host = 'localhost',port=3000,debug=True)
    