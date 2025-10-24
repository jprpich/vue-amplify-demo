<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>AWS Amplify Gen 2</template>

    This demo showcases
    <a href="https://docs.amplify.aws/" target="_blank" rel="noopener">AWS Amplify Gen 2</a>, a
    modern full-stack development platform. Amplify automatically provisions and configures AWS
    services including Lambda, API Gateway, DynamoDB, and more - all from code-first TypeScript
    definitions.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Serverless REST API</template>

    The backend uses
    <a href="https://aws.amazon.com/lambda/" target="_blank" rel="noopener">AWS Lambda</a>
    functions behind
    <a href="https://aws.amazon.com/api-gateway/" target="_blank" rel="noopener">API Gateway</a>
    to handle requests. Try the <strong>API Test</strong> and <strong>Contact</strong> pages to see
    serverless functions in action - no server management required!
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>DynamoDB Integration</template>

    Data is stored in
    <a href="https://aws.amazon.com/dynamodb/" target="_blank" rel="noopener">Amazon DynamoDB</a>, a
    fully managed NoSQL database. The contact form submissions are automatically saved to a DynamoDB
    table with millisecond latency and automatic scaling. Amplify handles all the IAM permissions
    and table configuration.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>S3 & CloudFront Hosting</template>

    This Vue app is hosted on
    <a href="https://aws.amazon.com/s3/" target="_blank" rel="noopener">Amazon S3</a>
    and distributed globally via
    <a href="https://aws.amazon.com/cloudfront/" target="_blank" rel="noopener">CloudFront CDN</a>.
    Amplify automatically handles build, deployment, and CDN invalidation. Your users get fast load
    times from edge locations worldwide.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Infrastructure as Code</template>

    Everything is defined in TypeScript using Amplify's
    <a href="https://docs.amplify.aws/vue/build-a-backend/" target="_blank" rel="noopener"
      >code-first approach</a
    >. No manual AWS console clicking required. The entire stack - functions, database, API, and
    hosting - is version controlled and deployed with a single command.
  </WelcomeItem>
</template>
