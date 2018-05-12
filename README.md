# Progetto-RC
Progetto per il corso Reti di Calcolatori dell'università La Sapienza di Roma.

NOME: Valerio

COGNOME: Gioffrè

## Requisiti

I requisiti per la corretta consegna del progetto sono:

  - Utilizzare almeno 2 servizi REST:  
      Almeno 1 dei servizi deve essere commerciale (Facebook, Twitter, Google, ecc.);      
      Almeno 1 dei servizi deve essere acceduto con OAuth;
  - Utilizzare websocket per almeno 1 funzionalità;
  - Utilizzare AMQP (o simili) per almeno 1 funzionalità;
  - Sviluppare e documentare tutti i file e le API su GitHub;
  
## Preparazione
 - Per installare le dipendenze eseguire _npm install nome_. 
  
 - RabbitMQ e CouchDB devono essere in esecuzione su localhost.

## Descrizione
Il progetto è formato da due parti, **send.js** e **attach.js**:
attraverso OAuth, la prima ci autentifica su Google Drive dove leggerà la lista dei file dell'account e la invierà a **attach.js**, il quale la riceve e la salva in un file formato JSON.
Lo scambio di messaggi è affidato a RabbitMQ.
In seguito verrà richiesto l'upload di un file JSON tramite metodo POST su [localhost:8080](http://localhost:8080/), il quale sarà attaccato ad un database già esistente di couch-db.
Il server partirà da [localhost:3000](http://localhost:3000/).

### API utilizzate e link utili
- [Google Drive](https://developers.google.com/drive/v3/web/quickstart/nodejs)

- [CouchDB](http://docs.couchdb.org/en/2.1.1/)

- [RabbitMQ](https://www.rabbitmq.com/getstarted.html)

- [NodeJs](https://nodejs.org/it/)

- [OAuth 2.0](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
