pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test'
            }
        }
    }

    post {
        always {
            echo "📦 Archiving reports..."
            archiveArtifacts artifacts: 'reports/**/*.log', allowEmptyArchive: true

            echo "📊 Publishing JUnit..."
            junit allowEmptyResults: true, testResults: 'reports/**/*.xml'

            echo "📤 Uploading results to TestRail..."
            sh '''
                node testrail-upload.js || true
            '''

            echo "🧹 Cleaning workspace..."
            cleanWs()
        }

        failure {
            echo "❌ Pipeline failed!"
        }

        success {
            echo "✅ Pipeline passed!"
        }
    }
}
