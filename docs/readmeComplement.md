### Configuration

### Pegar o user pool id

Vá no aws exports na pasta src, ache o campo "aws_user_pools_id" e cole na função processPayment.  

### Pegar credencias do stripe

![](docs/stripe_get.png)
![](docs/stripe_keys.png)

### Update nos arquivos com a public key

Checkout.js
processPayment (lambda function)

### Create order configuration

On the src folder of the the lambda function

```shell

npm i uuid

```
Pegue o nome da tabela 

```shell

amplify console

```
![](docs/20200821182012.png)
![](docs/20200821182056.png)
![](docs/20200821182133.png)
![](docs/20200821182258.png)
![](docs/20200821182341.png)

```shell

amplify push

```

## React side

```shell
npm i 
npm start
```

Não existem produtos criados ainda.

* Por questão de estabilidade as queries, mutations foram separadas. 
    * Passa as queries e mutations do video_resources/api para src/api
* Faça o login.

### Faça o usuário admin para que possa registrar livros

```shell
amplify console
```

![](docs/20200821214340.png)
![](docs/20200821214432.png)
![](docs/20200821214518.png)
![](docs/20200821214604.png)
![](docs/20200821214823.png)

### Configure a permissão do S3

* https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html#example-bucket-policies-use-case-2


![](docs/20200821221045.png)
![](docs/20200821221123.png)
![](docs/20200821221138.png)
![](docs/20200821221253.png)
![](docs/20200821221411.png)
![](docs/20200821221519.png)
![](docs/20200821221603.png)
![](docs/20200821221724.png)

### Stripe default card

![](docs/20200822011051.png)

### Remove orders from product

User cant see order, and by default mutations is using

### Lambda autrhorization

![](docs/20200822011646.png)
![](docs/20200822011742.png)
![](docs/20200822011800.png)
![](docs/20200822011858.png)
![](docs/20200822011933.png)
![](docs/20200822012011.png)
![](docs/20200822012129.png)

De maneira similar, de autorização para a outra função

![](docs/20200822012808.png)
![](docs/20200822012851.png)

Se tudo estiver correto, e um pagamento efetuado com sucesso, pode ser verificado no dashboard do sripe.

### Corrigir o erro de usuário

![](docs/20200822013647.png)