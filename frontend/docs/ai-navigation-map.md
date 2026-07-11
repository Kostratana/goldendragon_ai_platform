# AI Assistant Navigation Map

Use this map as structured context for the future on-site AI assistant.
It describes where visitors should be guided based on intent.

## Home

- Route: `/`
- Purpose: Present Golden Dragon AI Studio, the founder story, and the studio philosophy.
- Available actions: Open global navigation, go to Dragon Chat, explore services, explore AI solutions, read news.
- Related pages: Dragon Chat, Services, AI Solutions, News.
- Suggested navigation targets:
  - Project inquiry: `/chat`
  - Service overview: `/services`
  - Product exploration: `/solutions`
  - Studio updates: `/news`

## Dragon Chat

- Route: `/chat`
- Purpose: Help visitors describe a business challenge and identify possible AI solutions.
- Available actions: Chat with the assistant, describe a project, ask about services, ask about AI solutions.
- Related pages: Services, AI Solutions, Projects / Portfolio.
- Suggested navigation targets:
  - User wants implementation help: `/services`
  - User asks what products exist: `/solutions`
  - User asks for examples: `/services/portfolio`

## Services

- Route: `/services`
- Purpose: Explain AI consulting, AI development, LLM/generative AI, computer vision, evaluation, research, workflow, contact, and project start.
- Available actions: Review service groups, review work process, contact by email, open Dragon Chat.
- Related pages: Dragon Chat, Projects / Portfolio, AI Solutions.
- Suggested navigation targets:
  - User wants to start: `/chat`
  - User asks for previous work: `/services/portfolio`
  - User asks about proprietary products: `/solutions`

## Projects / Portfolio

- Route: `/services/portfolio`
- Purpose: Show selected AI engineering projects and demonstrated technical capabilities.
- Available actions: Review project examples, review technologies, continue to services or chat.
- Related pages: Services, AI Solutions, Dragon Chat.
- Suggested navigation targets:
  - User wants similar work: `/services`
  - User wants custom discussion: `/chat`
  - User wants product pages: `/solutions`

## AI Solutions

- Route: `/solutions`
- Purpose: Present proprietary AI technologies, intelligent systems, and products under development.
- Available actions: Open individual solution pages, compare technology areas, navigate to services or chat.
- Related pages: Health Support AI, Equine Health AI, Underwater Inspection AI, Quantum Trading AI, Luxury Concierge AI, Services, Dragon Chat.
- Suggested navigation targets:
  - Health or nutrition intent: `/solutions/health-support-ai`
  - Animal or veterinary intent: `/solutions/animal-health`
  - Marine inspection intent: `/solutions/underwater-ai`
  - Trading or market analytics intent: `/solutions/quantum-trading-ai`
  - Luxury concierge intent: `/solutions/luxury-concierge-ai`
  - Implementation request: `/services`
  - Contact request: `/chat`

## Health Support AI

- Route: `/solutions/health-support-ai`
- Purpose: Explain the AI assistant for food ingredient analysis, personalized health assessment, body symmetry analysis, and preventive healthcare.
- Available actions: Review project overview, review features, open chat, compare with services and portfolio.
- Related pages: AI Solutions, Services, Projects / Portfolio, Dragon Chat.
- Suggested navigation targets:
  - Build similar healthcare AI: `/services`
  - Discuss the project: `/chat`
  - See more solutions: `/solutions`

## Equine Health AI

- Route: `/solutions/animal-health`
- Purpose: Explain AI support for animal health, veterinary workflows, and equine-oriented intelligent assistance.
- Available actions: Review product overview, review platform details, open chat, compare with other solutions.
- Related pages: AI Solutions, Services, Projects / Portfolio, Dragon Chat.
- Suggested navigation targets:
  - Build animal health AI: `/services`
  - Discuss requirements: `/chat`
  - See other AI products: `/solutions`

## Underwater Inspection AI

- Route: `/solutions/underwater-ai`
- Purpose: Present AI-powered underwater inspection, hull defect detection, marine infrastructure assessment, robotics, and multimodal analysis.
- Available actions: Review inspection use cases, review technology stack, open chat.
- Related pages: AI Solutions, Services, Projects / Portfolio, Dragon Chat.
- Suggested navigation targets:
  - Build inspection/computer vision AI: `/services`
  - Discuss a marine project: `/chat`
  - See engineering examples: `/services/portfolio`

## Quantum Trading AI

- Route: `/solutions/quantum-trading-ai`
- Purpose: Present quantitative market intelligence, adaptive analytics, AI decision support, and research platform direction.
- Available actions: Review research platform, review market intelligence features, open chat.
- Related pages: AI Solutions, Services, Projects / Portfolio, Dragon Chat.
- Suggested navigation targets:
  - Build analytics or decision-support AI: `/services`
  - Discuss a finance AI project: `/chat`
  - See other product research: `/solutions`

## Luxury Concierge AI

- Route: `/solutions/luxury-concierge-ai`
- Purpose: Present personal AI concierge capabilities for luxury product discovery, semantic search, recommendations, and premium lifestyle services.
- Available actions: Review luxury product discovery, review concierge platform direction, open chat.
- Related pages: AI Solutions, Services, Projects / Portfolio, Dragon Chat.
- Suggested navigation targets:
  - Build concierge or recommendation AI: `/services`
  - Discuss a luxury platform: `/chat`
  - See more AI products: `/solutions`

## News

- Route: `/news`
- Purpose: Hold future studio updates, research notes, product releases, and development news.
- Available actions: Read status, return to main pages.
- Related pages: Home, AI Solutions, Services.
- Suggested navigation targets:
  - User wants active products: `/solutions`
  - User wants services: `/services`
  - User wants to talk now: `/chat`
