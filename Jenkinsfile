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
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm run test'
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

            // If JS uploader exists
            bat '''
                node testrail-upload.js || exit 0
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
