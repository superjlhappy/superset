FROM harbor.reda-flight.com/public/superset:4.0.1 AS superset-node

RUN echo '\n\
deb http://mirrors.ustc.edu.cn/debian/ bullseye main contrib\n\
deb http://mirrors.ustc.edu.cn/debian/ bullseye-updates main contrib\n\
deb http://mirrors.ustc.edu.cn/debian/ bullseye-backports main contrib\n\
deb http://mirrors.ustc.edu.cn/debian-security bullseye-security main contrib\n\
'> /etc/apt/sources.list

# RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources

# NPM ci first, as to NOT invalidate previous steps except for when package.json changes

# run 1800s
RUN  apt-get update -qq && apt-get install -y --no-install-recommends \
        mariadb-client \
        libmariadb-dev \
        build-essential \
        pkg-config \
    && chown -R superset:superset ./* \

# 获取 mariadb_config 的输出并设置环境变量
RUN export MYSQLCLIENT_CFLAGS="$(mariadb_config --cflags)" && \
    export MYSQLCLIENT_LDFLAGS="$(mariadb_config --libs)" && \
    echo "MYSQLCLIENT_CFLAGS=$MYSQLCLIENT_CFLAGS" >> /etc/environment && \
    echo "MYSQLCLIENT_LDFLAGS=$MYSQLCLIENT_LDFLAGS" >> /etc/environment

# 使环境变量在后续步骤中可用
ENV MYSQLCLIENT_CFLAGS="${MYSQLCLIENT_CFLAGS}" \
    MYSQLCLIENT_LDFLAGS="${MYSQLCLIENT_LDFLAGS}"

# setup.py uses the version information in package.json
COPY --chown=superset:superset superset-frontend/package.json superset-frontend/
COPY --chown=superset:superset requirements/base.txt requirements/
COPY --chown=superset:superset requirements/development.txt requirements/
COPY --chown=superset:superset scripts/check-env.py scripts/
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir --upgrade -i ${PIP_INDEX_URL} setuptools pip \
    && pip install --no-cache-dir -i ${PIP_INDEX_URL} -r requirements/development.txt \
    && apt-get autoremove -yqq --purge build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the compiled frontend assets
# COPY --chown=superset:superset --from=superset-node /app/superset/static/assets superset/static/assets
