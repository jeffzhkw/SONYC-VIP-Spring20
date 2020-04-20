from passlib.hash import sha256_crypt
import logging
import setting_up as sql
def authenticate(user):
    # @ToDo: Setting up retrieval of password
    dbpassword = sql.getting_password(user.username)
    if dbpassword is None:
        hash_password = sha256_crypt.encrypt(user.password)
        user.password = hash_password
        # sql.insert_into_db(hash) -> inserting into db
        logging.info("New user is created")
        return "New User"
    else:
        return sha256_crypt.verify(user.password,dbpassword)
