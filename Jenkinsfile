node {
    checkout scm
    environment {
        CI = 'true'
    }
    stage('Clean') {
        // Clean files from last build.
        sh 'git clean -dfxq'
        sh '/usr/local/bin/docker-compose -f ./provisioning/docker-compose.yaml down --rmi all -v'
    }
    stage('Setup') {
        // Prefer yarn over npm.
        sh 'yarn install || npm install'
        dir('client')
        {
            sh 'yarn install || npm install'
        }
    }
    stage('Test') {
        withEnv(['CI=true']) {

        }
        sh 'npm run test:nowatch'
        dir('client') {
            withEnv(['CI=true']) {
                sh 'npm run test:nowatch'
            }
        }
    }
    stage('Build'){
        sh './dockerbuild.sh'
        sh 'echo GIT_COMMIT=$(git rev-parse HEAD) > .env'
        sh '/usr/local/bin/docker-compose -f ./provisioning/docker-compose.yaml up -d'
        sleep 10 // wait for container to be available
    }
    stage('Load and API tests') {
        sh 'npm run apitest:nowatch'
        sh 'npm run loadtest'
    }
    stage('Deploy') {
        dir('./provisioning')
        {
            sh "./provision-new-environment.sh"
        }
    }
    junit '**/junitreports/*.xml'
}
