const columns = document.querySelectorAll('.column-cards');
const btnAdd = document.querySelector('.Adicionar');


let draggedCard;

const dragstart = (event) => {
    draggedCard = event.target;//event.target se refere ao elemento html usado para disparar o evento 
    event.dataTransfer.effectAllowed = "move";//tirando o efeito de copia
};

const dragOver = (event ) => {
    event.preventDefault();

}

const dragEnter = ({target}) => {

    if(target.classList.contains("column-cards")){//se conter a class column-cads/ for uma coluna
        target.classList.add('column-highlight');
    }  
}

const dragLeave = ({target}) => {
    target.classList.remove('column-highlight');
}

const drop = ({target}) => {

    target.classList.remove('column-highlight');

    if(target.classList.contains("column-cards")){//se conter a class column-cads/ for uma coluna
        target.append(draggedCard);//adiciona no target o elemento arrastado
    }
}

const dblClick = ({target}) => {
   const card = document.createElement("section")

   if(!target.classList.contains("column-cards")) return//se não conter a class column-cads retorna

    card.className = "card";
    card.draggable = "true"
    card.contentEditable = "true";//o texto pode ser editado

    card.addEventListener('focusout', () => {//dispara quando o sai da iteração com o elemento
        card.contentEditable = "false";//o texto não pode ser editado

        if(!card.textContent) card.remove();//se o texto tiver em branco, remove card

    })

        card.addEventListener('dragstart', dragstart)//dispara ao elemento se arrastado

        target.append(card)
        card.focus()//focado na iteração com o elemento
 
}



const removerColumn = ({target}) => {

  console.log('remover')
}





columns.forEach((column) => {
    column.addEventListener('dragover', dragOver)//dispara quando um elemento um elemento é arrastado por cima do column
    column.addEventListener('dragenter', dragEnter)//dispara o elemento html se entrar nele
    column.addEventListener('dragleave', dragLeave)//dispara o elemento html se sair dele 
    column.addEventListener('drop', drop)
    column.addEventListener('dblclick', dblClick)
    column.addEventListener('click', removerColumn)

})




const addColumn = ({target}) => {
    const coluna = document.querySelector('.column').cloneNode('true');
    const lugarColuna = document.querySelector('.columns');

    const title = coluna.querySelector('.column-title');
    title.innerHTML = ' '
    title.contentEditable = 'true';
    
  

    lugarColuna.append(coluna);
    console.log(title)
    title.focus();

    title.addEventListener('focusout', () => {

        title.contentEditable = 'false';
        if(title.textContent.length < 2) coluna.remove();

    })
    
}


btnAdd.addEventListener('click', addColumn) 
