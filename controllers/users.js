const usersModel = require('../models/users');

const createUser = async (req,res)=>{
    res.send('se ha creado un usuario');
}

const updateUser = async (req,res)=>{
    res.send('se ha modificado un usuario');
}

const deleteUser = async (req,res)=>{
    res.send('se ha borrado un usuario');
}

const getFromCity = async (req,res)=>{
    res.send('se ha regresado usuarios de una ciudad');
}

module.exports = {createUser, updateUser, deleteUser, getFromCity};