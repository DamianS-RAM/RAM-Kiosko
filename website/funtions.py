from . import app
from flask import session
from flask_login import current_user
from datetime import datetime, timedelta, timezone

class functionalities():
    def check_permissions( permited_level_names ):
        if current_user.user_lvl.level_name in permited_level_names:
            return True
        return False
    

    def set_user_session_time( user ):
        if user.user_lvl.level_name == 'User':
            # Sets level='User' expiration session to 3 minutes from now to enforce it even at session renew
            session['expire_at'] = datetime.now().replace(tzinfo=timezone(offset=timedelta())) + timedelta(minutes=3)
        else:
            app.permanent_session_lifetime = timedelta(minutes = 30)
        
    
    def check_valid_dir_by_company(directory, company):
        base_dir_list = { 'RAM': ['\\\\10.0.3.19\\version activa\\IntelisisCFDi_RAMLABOR\\Nominas', '\\\\10.0.3.19\\version activa\\IntelisisCFDi_RAMLABOR\\Nominas\\NomRam'], 'WMM': ['\\\\10.0.3.19\\version activa\\IntelisisCFDi_RAMLABOR\\Nominas\\William'] }

        if directory.rsplit('\\', 2)[0] in base_dir_list[company]:
            return True
        
        return False