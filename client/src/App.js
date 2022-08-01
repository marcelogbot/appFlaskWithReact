import React, {useState, useEffect} from 'react';

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/contentPDF").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>

      <p><b>Aqui aparece o conteudo</b></p>
      <form onSubmit={''}>
        <input placeholder='Informe o caminho do arquivo!' size='100' type="text" ></input><text> . </text>
        
        <button type='submit'>Enviar</button>
      </form>
      <br />
      <p><b>O caminho selecionado é = </b>{'Tem que criar o construction para pegar a variável'}</p>
      

      {(typeof data.conteudo === 'undefined') ? (
        <p>Carregando...</p>
      ): (
        data.conteudo.map((conteudo,i) => (
          <p key={i}>{conteudo}</p>
        ))
      )}
      
    </div>
  )
}

export default App;

