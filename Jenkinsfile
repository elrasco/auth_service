node {
  stage 'Checkout Git'
  git branch: 'development', credentialsId: 'bitbucket', url: 'https://puemos:BBBbeat9@bitbucket.org/_smallfish/smallfish_auth.git'
  
  stage 'Build Docker Image'
  sh 'docker build -t smallfish/auth .'

  stage 'Push Docker Image to ECR'
  sh '''   
    docker tag smallfish/auth:latest 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:test
    
    docker push 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:test
    '''

}