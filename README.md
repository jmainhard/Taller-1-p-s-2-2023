# Taller 1 - Pruebas de software

Scrap of houses in [Portal Inmobiliario](https://www.portalinmobiliario.com). 

<!-- toc -->
* [Starting](#starting)
* [Usage](#usage)
    * [Commands](#commands)
* [Contributors](#contributors)
<!-- tocstop -->

## Starting 🚀
### Requirements
- Node v10^ LTS

### Install libraries

`npm install`

## Usage 📖

### IMPORTANT

**Please, first create the `json` and `xlsx` folder in the root of the project**

### Run with default configuration

`npm run start`


### Flags
<!-- flags -->

Run the script with the specified flag.

```
USAGE
  $ npm run start -- --[FLAG] 

FLAGS
  --maxPages=N       Number of pages to scrap
  --perPage=P        Quantity of products per page
  --location=L       Location to search (Not implemented yet)
  --maximumPrice=MP  Maximum price to search
```

<!-- flagsstop -->

## Contributors
- Nicolás Rivas
- Nicolás Sanhueza
- Jorge Mainhard

## TODO (Refactoring)
- Flag --location no se utiliza, documentar ✅
- fs.writefile debería estar en utils porque se ocupa en filter y script. ✅
- Documentar funciones ✅
- Documentar proyecto (funcionalidad, forma de utilizar y requerimientos) ✅
- new Intl.NumberFormat Se instancia por cada casa, se puede extraer como constante global o hace una funcion  ✅
- extraer las peticiones de axios (p.ej. axios.get) a una función que retorne HTML directamente ✅
- bug el json se genera dos veces y se genera dos veces


