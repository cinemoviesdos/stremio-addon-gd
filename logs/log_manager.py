import logging

def setup_logger():
    logger = logging.getLogger('GdriveStremioLogger')
    logger.setLevel(logging.DEBUG)
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
    ch.setFormatter(formatter)
    logger.addHandler(ch)
    return logger

logger = setup_logger()

def log_error(error_message):
    logger.error(error_message)

def log_info(info_message):
    logger.info(info_message)
