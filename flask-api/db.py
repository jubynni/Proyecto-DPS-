import mysql.connector
from mysql.connector import Error


#Diccionarios para conexion a alepo y a base de datos local
dental_bd = {
    'user': 'root',
    'password':'112233445566',
    'host':'localhost',
    'port':3306,
    'database':'dental_bd',
    'autocommit':True
}


def bd():
    #Devuelve conexion a BD
    db = None
    try:
        db = mysql.connector.connect(**dental_bd)
    except Error as e:
        print("Error al establecer conexion con base de datos.",str(e))
    return db


def sql(consulta, filtros, unico=False):
    try:
        db = bd()
        cursor = db.cursor(dictionary=True)
        cursor.execute(consulta, filtros)
        rs = cursor.fetchone() if unico else cursor.fetchall()
        cursor.close()
        db.close()
        return rs
    except Exception as e:
        print(f"Error al ejecutar consulta {consulta} con valores {filtros}: {e}", flush=True)
        return []


def insertar_o_actualizar(consulta, valores):
    try:
        db = bd()
        cursor = db.cursor()
        cursor.execute(consulta, valores)
        cursor.close()
        db.close()
        return True
    except Exception as e:
        print(f"Error al insertar {consulta} con valores {valores}: {e}", flush=True)
        return False
