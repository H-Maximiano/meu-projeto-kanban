from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configuração do SQLite (vai criar um arquivo de banco de dados automaticamente)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)


# 1. Definindo a Tabela de Tarefas no Banco de Dados
class TarefaModel(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  status = db.Column(db.String(20), default="pendente")

  # Função auxiliar para converter o objeto do banco em dicionário JSON
  def to_dict(self):
    return {"id": self.id, "name": self.name, "status": self.status}


# Cria o arquivo do banco de dados e as tabelas automaticamente ao iniciar
with app.app_context():
  db.create_all()


# 2. ROTA GET: Listar todas as tarefas do banco
@app.route("/api/tarefas", methods=["GET"])
def listar_tarefas():
  tarefas = TarefaModel.query.all()
  return jsonify([t.to_dict() for t in tarefas])


# 3. ROTA POST: Criar nova tarefa e salvar no banco
@app.route("/api/tarefas", methods=["POST"])
def criar_tarefa():
  dados = request.get_json()
  nome = dados.get("name")

  if not nome:
    return jsonify({"erro": "O nome da tarefa é obrigatório"}), 400

  nova_tarefa = TarefaModel(name=nome, status="pendente")
  db.session.add(nova_tarefa)
  db.session.commit()  # Salva de vez no SQLite

  return jsonify(nova_tarefa.to_dict()), 201


# 4. ROTA PATCH: Atualizar o status no banco
@app.route("/api/tarefas/<int:id>/status", methods=["PATCH"])
def atualizar_status(id):
  dados = request.get_json()
  novo_status = dados.get("status")

  tarefa = TarefaModel.query.get(id)
  if not tarefa:
    return jsonify({"erro": "Tarefa não encontrada"}), 404

  tarefa.status = novo_status
  db.session.commit()  # Salva a alteração no SQLite

  return jsonify(
      {"mensagem": "Status atualizado com sucesso!", "tarefa": tarefa.to_dict()}
  )


# 5. ROTA DELETE: Apagar do banco de dados
@app.route("/api/tarefas/<int:id>", methods=["DELETE"])
def deletar_tarefa(id):
  tarefa = TarefaModel.query.get(id)
  if not tarefa:
    return jsonify({"erro": "Tarefa não encontrada"}), 404

  db.session.delete(tarefa)
  db.session.commit()  # Remove do SQLite

  return jsonify({"mensagem": "Tarefa deletada com sucesso!"})


if __name__ == "__main__":
  app.run(debug=True)