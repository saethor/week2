node {
    checkout scm
    stage('Clean') {
        // Clean files from last build.
        sh 'git clean -dfxq'
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
        sh 'npm run test:nowatch'
    }
    stage('Build'){
        sh './dockerbuild.sh'
        sh 'docker-compose up'
    }
    stage('API test') {
        sh 'npm run apitest:nowatch'
        sh 'docker-compose down'
    }
    stage('Deploy') {
        dir('./provisioning')
        {
            sh "./provision-new-environment.sh"
        }
    }
}
