document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("container-produtos");

    const URL_API = "http://localhost:3000/api/produtos";


    async function carregarProdutos() {

        try {

            const resposta = await fetch(URL_API);

            const produtos = await resposta.json();

            container.innerHTML = "";


            produtos.forEach((produto) => {

                const card = document.createElement("article");

                card.classList.add("card");


                card.innerHTML = `
                    <img src="${produto.img}" alt="${produto.nome}">

                    <h3>${produto.nome}</h3>

                    <p>${produto.descricao}</p>

                    <p class="preco">
                        R$ ${Number(produto.preco).toFixed(2)}
                    </p>
                `;


                container.appendChild(card);

            });

        } catch (erro) {

            console.error("Erro ao carregar produtos:", erro);

            container.innerHTML =
                "<p>Não foi possível carregar os produtos.</p>";

        }

    }


    carregarProdutos();

});