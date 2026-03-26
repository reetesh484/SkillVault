from django_redis import get_redis_connection

def invalidate_cache(self, prefix):
    con = get_redis_connection("default")
    pattern = f"*{prefix}_{self.request.user.id}_*"
    keys = con.keys(pattern)
    if keys:
        con.delete(*keys)