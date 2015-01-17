import redis
import random
import sys

maxtime_token = 30*60
maxtime_status = 30*60
maxtime_progress = 30*60
maxtime_session = 30*60

def init():
	r=redis.Redis('localhost')
	return r


def token(login, file, version, r=redis.Redis('localhost')):
	login=login.lower()
	file=file.lower()
	info=login+':'+file+':'+str(version)
	if r.hexists(info, 'token'):
		r.expire(info, (maxtime_token))
		return [1,int(r.hget(info, 'token'))]
	else:
		token=random.randint(0,sys.maxint)
		r.hset(info, 'token', token)
		r.expire(info, (maxtime_token))
		return [0,int(r.hget(info, 'token'))]

def chktoken(login, version, r=redis.Redis('localhost')):
	login=login.lower()
	file=file.lower()
	info=login+':'+file+':'+str(version)
	if r.hexists(info, 'token'):
		r.expire(info, (maxtime_token))
		return int(r.hget(info, 'token'))
	else:
		return -1

def session_id(login, r=redis.Redis('localhost')):
	login=login.lower()
	if r.hexists(login, 'session_id'):
		r.expire(login, (maxtime_session))
		return int(r.hget(login, 'session_id'))
	else:
		sid=random.randint(0,sys.maxint)
		r.hset(login, 'session_id', sid)
		r.expire(login, (maxtime_session))
		return int(r.hget(login, 'session_id'))

def get_SID(login, r=redis.Redis('localhost')):
	login=login.lower()
	if r.hexists(login, 'session_id'):
		r.expire(login, (maxtime_session))
		return r.hget(login, 'session_id')
	else:
		return -1


def status(login, file, status='ERROR', r=redis.Redis('localhost')):
	login=login.lower()
	file=file.lower()
	info=login+':'+file
	if r.hexists(info, 'token'):
		r.hset(info, 'status', status)
		r.expire(info, (maxtime_status))
		return r.hget(info, 'status')
	else:
		return -1

def progress(login, file, progress='-1', r=redis.Redis('localhost')):
	login=login.lower()
	file=file.lower()
	info=login+':'+file
	if r.hexists(info, 'token'):
		r.hset(info, 'progress', progress)
		r.expire(info, (maxtime_progress))
		return int(r.hget(info, 'progress'))
	else:
		return -1


def logout(login, r=redis.Redis('localhost')):
	login=login.lower()
	if r.hexists(login, 'session_id'):
		r.delete(login)
		return True
	else:
		return False
