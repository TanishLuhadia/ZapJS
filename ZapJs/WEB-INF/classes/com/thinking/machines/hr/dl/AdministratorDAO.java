package com.thinking.machines.hr.dl;
import java.sql.*;
import java.util.*;
public class AdministratorDAO
{
public AdministratorDTO getByUsername(String username) throws DAOException
{
try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select * from administrator where uname=?");
preparedStatement.setString(1,username);
ResultSet resultSet;
resultSet=preparedStatement.executeQuery();
if(resultSet.next()==false)
{
resultSet.close();
preparedStatement.close();
connection.close();
throw new DAOException("Invalid username : "+username);
}
AdministratorDTO administrator=new AdministratorDTO();
administrator.setUsername(username);
administrator.setPassword(resultSet.getString("pwd").trim());
resultSet.close();
preparedStatement.close();
connection.close();
return administrator;
}catch(Exception exception)
{
throw new DAOException(exception.getMessage());
}
}
}