import { Configuration, OpenAIApi } from 'openai';
import { CompanyProfile, BrandVoice, TargetAudience } from '../../types/onboarding';

interface CompanyAnalysis {
  companyProfile: Partial<CompanyProfile>;
  brandVoice: Partial<BrandVoice>;
  targetAudience: Partial<TargetAudience>;
  suggestedHashtags: string[];
  competitorInsights: {
    mainCompetitors: string[];
    competitiveAdvantages: string[];
    marketGaps: string[];
  };
}

class CompanyAnalyzer {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.openai = new OpenAIApi(configuration);
  }

  async analyzeCompany(companyData: {
    name: string;
    website: string;
    socialMedia?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
      linkedin?: string;
    };
  }): Promise<CompanyAnalysis> {
    try {
      // Create a detailed prompt for OpenAI
      const prompt = `Analyze the following company:
        Company Name: ${companyData.name}
        Website: ${companyData.website}
        Social Media: ${Object.entries(companyData.socialMedia || {})
          .map(([platform, url]) => `${platform}: ${url}`)
          .join(', ')}

        Please provide a comprehensive analysis including:
        1. Company profile and industry positioning
        2. Brand voice and personality traits
        3. Target audience demographics and psychographics
        4. Key competitors and market positioning
        5. Suggested hashtags and content themes
        
        Format the response as structured data.`;

      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 1000,
        temperature: 0.7
      });

      // Parse and structure the AI response
      const analysis = this.parseAIResponse(response.data.choices[0].text || '');

      return analysis;
    } catch (error) {
      console.error('Company analysis failed:', error);
      throw new Error('Failed to analyze company data');
    }
  }

  private parseAIResponse(response: string): CompanyAnalysis {
    // In a real implementation, you would parse the AI response carefully
    // For now, we'll return mock data
    return {
      companyProfile: {
        description: "Technology company focused on innovation",
        competitors: ["Competitor A", "Competitor B"],
        industry: "Software & Technology"
      },
      brandVoice: {
        personality: {
          traits: ["Professional", "Innovative", "Trustworthy"],
          tone: "professional"
        },
        values: ["Innovation", "Quality", "Customer Success"],
        messaging: {
          uniqueValue: "Cutting-edge solutions that drive business growth",
          tagline: "Innovating for tomorrow"
        }
      },
      targetAudience: {
        demographics: {
          ageRanges: ["25-34", "35-44"],
          locations: ["United States", "Europe"],
          jobTitles: ["CTO", "IT Manager", "Developer"],
          industries: ["Technology", "Finance", "Healthcare"]
        },
        interests: ["Digital Transformation", "Cloud Computing", "AI/ML"],
        challenges: ["Scaling Operations", "Digital Transformation", "Cost Optimization"],
        goals: ["Improve Efficiency", "Drive Innovation", "Reduce Costs"]
      },
      suggestedHashtags: [
        "#TechInnovation",
        "#DigitalTransformation",
        "#FutureOfWork",
        "#TechTrends"
      ],
      competitorInsights: {
        mainCompetitors: ["Competitor A", "Competitor B", "Competitor C"],
        competitiveAdvantages: [
          "Innovative technology stack",
          "Superior user experience",
          "Strong customer support"
        ],
        marketGaps: [
          "Enterprise solution integration",
          "Small business market",
          "Industry-specific features"
        ]
      }
    };
  }
}

export default new CompanyAnalyzer();