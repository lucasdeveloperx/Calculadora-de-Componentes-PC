let components = [];

const componentOrder = {
  "Processador": 1,
  "Placa Mãe": 2,
  "Memória RAM": 3,
  "SSD ou HD": 4,
  "Fonte": 5,
  "Placa de Vídeo": 6
};

window.onload = function() {
  loadComponents();
};

function addComponent() {
  const componentName = document.getElementById("componentName").value;
  const componentBrand = document.getElementById("componentBrand").value;
  const componentPrice = parseFloat(document.getElementById("componentPrice").value);
  const componentLink = document.getElementById("componentLink").value;
  const componentImage = document.getElementById("componentImage").value;

  if (componentName && componentPrice && componentLink) {
    const component = {
      name: componentName,
      brand: componentBrand,
      price: componentPrice,
      link: componentLink,
      image: componentImage // Adicionando o link da imagem ao componente
    };

    components.push(component);
    sortComponents();
    saveComponents();
    displayComponents();
    calculateTotal();
    
    // Remover opção já cadastrada do select
    const selectElement = document.getElementById("componentName");
    const selectedIndex = selectElement.selectedIndex;
    selectElement.remove(selectedIndex);
  } else {
    alert("Por favor, preencha o nome, preço e link do componente.");
  }
}

function displayComponents() {
  const componentList = document.getElementById("componentList");
  componentList.innerHTML = "";
  components.forEach((component, index) => {
    const componentItem = document.createElement("div");
    componentItem.classList.add("component-item");
    let componentHtml = `
      <span>${component.name} (${component.brand}): R$${component.price.toFixed(2)}</span>
      <a href="${component.link}" target="_blank">Link</a>
      <button onclick="deleteComponent(${index})">Excluir</button>
    `;
    if (component.image) {
      componentHtml += `<img src="${component.image}" alt="${component.name}">`; // Adicionando a tag <img> se houver link de imagem
    }
    componentItem.innerHTML = componentHtml;
    componentList.appendChild(componentItem);
  });
}

function sortComponents() {
  components.sort((a, b) => {
    return componentOrder[a.name] - componentOrder[b.name];
  });
}

function calculateTotal() {
  const totalPrice = components.reduce((acc, curr) => acc + curr.price, 0);
  document.getElementById("totalPrice").textContent = `Total: R$${totalPrice.toFixed(2)}`;
}

function saveComponents() {
  localStorage.setItem('components', JSON.stringify(components));
}

function loadComponents() {
  const storedComponents = localStorage.getItem('components');
  if (storedComponents) {
    components = JSON.parse(storedComponents);
    sortComponents();
    displayComponents();
    calculateTotal();
    
    // Remover opções já cadastradas do select
    components.forEach(component => {
      const optionIndex = Array.from(document.getElementById("componentName").options).findIndex(option => option.value === component.name);
      if (optionIndex !== -1) {
        document.getElementById("componentName").remove(optionIndex);
      }
    });
  }
}

function deleteComponent(index) {
  // Adicionar o componente excluído de volta à caixa de seleção
  const removedComponent = components.splice(index, 1)[0];
  saveComponents();
  displayComponents();
  calculateTotal();
  
  const selectElement = document.getElementById("componentName");
  const option = document.createElement("option");
  option.text = removedComponent.name;
  option.value = removedComponent.name;
  selectElement.add(option);
}

function displayComponents() {
    const componentList = document.getElementById("componentList");
    componentList.innerHTML = "";
    components.forEach((component, index) => {
      const componentItem = document.createElement("div");
      componentItem.classList.add("component-item");
      let componentHtml = `
        <span>${component.name} (${component.brand}): R$${component.price.toFixed(2)}</span>
        <a href="${component.link}" target="_blank">Link</a>
        <button onclick="deleteComponent(${index})">Excluir</button>
      `;
      if (component.image) {
        // Adicionando a tag <img> com a classe 'component-image' para aplicar estilos
        componentHtml += `<img src="${component.image}" alt="${component.name}" class="component-image">`;
      }
      componentItem.innerHTML = componentHtml;
      componentList.appendChild(componentItem);
    });
  }
  
  function editComponent(index) {
    const component = components[index];
    const updatedComponent = promptComponentInfo(component);
  
    if (updatedComponent) {
      components[index] = updatedComponent;
      saveComponents();
      displayComponents();
      calculateTotal();
    }
  }
  
  function promptComponentInfo(component) {
    const updatedComponent = { ...component }; // Clonando o objeto para não modificar o original
  
    updatedComponent.name = prompt("Digite o novo nome do componente:", component.name);
    updatedComponent.brand = prompt("Digite a nova marca do componente:", component.brand);
    updatedComponent.price = parseFloat(prompt("Digite o novo preço do componente:", component.price));
    updatedComponent.link = prompt("Digite o novo link do componente:", component.link);
    updatedComponent.image = prompt("Digite o novo link da imagem:", component.image);
  
    if (!updatedComponent.name || !updatedComponent.brand || !updatedComponent.price || !updatedComponent.link) {
      alert("Por favor, preencha todas as informações do componente.");
      return null; // Retorna null se alguma informação estiver faltando
    }
  
    return updatedComponent;
  }

  