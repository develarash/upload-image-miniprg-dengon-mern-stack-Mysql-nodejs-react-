import { Sequelize } from "sequelize";

const db=new Sequelize("owen","root","wkdJrp4jtkSexXRi",{

    host:"services.irn1.chabokan.net",
    dialect:"mysql",
    port: 33715

})
export default db;