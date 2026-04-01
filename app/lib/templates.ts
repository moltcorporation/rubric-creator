import { RubricGridData } from "./types";

export interface TemplateDefinition {
  name: string;
  description: string;
  subject: string;
  gradeLevel: string;
  isFree: boolean;
  gridData: RubricGridData;
}

function t(
  name: string,
  description: string,
  subject: string,
  gradeLevel: string,
  isFree: boolean,
  criteria: string[],
  levels: { name: string; points: number }[],
  cellDescriptions: string[][]
): TemplateDefinition {
  const criteriaObjs = criteria.map((c) => ({ id: c.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).slice(2, 8), name: c }));
  const levelObjs = levels.map((l) => ({ id: l.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).slice(2, 8), ...l }));
  const cells: Record<string, string> = {};
  criteriaObjs.forEach((c, ci) => {
    levelObjs.forEach((l, li) => {
      if (cellDescriptions[ci]?.[li]) {
        cells[`${c.id}-${l.id}`] = cellDescriptions[ci][li];
      }
    });
  });
  return { name, description, subject, gradeLevel, isFree, gridData: { criteria: criteriaObjs, levels: levelObjs, cells } };
}

const std4 = [
  { name: "Excellent", points: 4 },
  { name: "Good", points: 3 },
  { name: "Satisfactory", points: 2 },
  { name: "Needs Improvement", points: 1 },
];

export const ALL_TEMPLATES: TemplateDefinition[] = [
  // === 5 FREE TEMPLATES ===
  t("Essay Writing", "Evaluate essays on thesis, evidence, organization, and mechanics.", "ELA", "6-12",
    true,
    ["Thesis Statement", "Evidence & Support", "Organization", "Grammar & Mechanics"],
    std4,
    [
      ["Clear, insightful thesis that directly addresses the prompt", "Adequate thesis that addresses the prompt", "Vague thesis that partially addresses the prompt", "No clear thesis or does not address the prompt"],
      ["Multiple strong, relevant pieces of evidence with analysis", "Adequate evidence with some analysis", "Limited evidence with minimal analysis", "Little to no evidence provided"],
      ["Logical flow with clear intro, body, and conclusion; smooth transitions", "Generally organized with intro, body, conclusion", "Some organization but lacks clear structure", "No clear organizational structure"],
      ["Few to no errors; varied sentence structure", "Minor errors that don't impede understanding", "Several errors that occasionally impede understanding", "Frequent errors that significantly impede understanding"],
    ]),

  t("Oral Presentation", "Assess presentations on content, delivery, visuals, and engagement.", "General", "4-12",
    true,
    ["Content Knowledge", "Delivery & Speaking", "Visual Aids", "Audience Engagement"],
    std4,
    [
      ["Demonstrates thorough understanding; answers questions with depth", "Demonstrates solid understanding; answers most questions", "Demonstrates basic understanding; struggles with questions", "Shows little understanding of topic"],
      ["Clear, confident voice; excellent eye contact and pacing", "Generally clear voice; good eye contact", "Uneven volume or pacing; limited eye contact", "Difficult to hear; reads directly from notes"],
      ["Professional, creative visuals that enhance the presentation", "Clear visuals that support the presentation", "Visuals present but add little value", "No visuals or visuals are distracting"],
      ["Actively engages audience throughout; handles Q&A well", "Engages audience at times", "Limited audience interaction", "No attempt to engage audience"],
    ]),

  t("Group Project", "Evaluate collaboration, individual contribution, and final product.", "General", "3-12",
    true,
    ["Collaboration", "Individual Contribution", "Quality of Work", "Time Management"],
    std4,
    [
      ["Actively listens, compromises, and supports all team members", "Works well with team; contributes to discussions", "Participates but sometimes disengaged", "Does not collaborate; causes conflict"],
      ["Exceeds expected share of work; takes initiative", "Completes fair share of work", "Completes some work but below expectations", "Does not contribute meaningfully"],
      ["Exceptional quality; thorough, accurate, and creative", "Good quality; meets all requirements", "Acceptable but missing some requirements", "Below expectations; incomplete"],
      ["Group meets all deadlines with time to spare", "Group meets most deadlines", "Group misses some deadlines", "Group misses major deadlines"],
    ]),

  t("Science Lab Report", "Assess lab reports on hypothesis, procedure, data, and conclusions.", "Science", "6-12",
    true,
    ["Hypothesis", "Procedure & Methods", "Data & Analysis", "Conclusion"],
    std4,
    [
      ["Clear, testable hypothesis with scientific reasoning", "Testable hypothesis present", "Hypothesis present but not clearly testable", "No hypothesis or not scientifically based"],
      ["Detailed, repeatable procedure with all materials listed", "Clear procedure with most materials listed", "Procedure present but lacks detail", "Procedure missing or unclear"],
      ["Accurate data collection; thorough analysis with graphs/charts", "Data collected and analyzed with some visuals", "Data present but analysis is incomplete", "Data missing or inaccurate"],
      ["Insightful conclusion linking results to hypothesis; discusses errors", "Conclusion addresses hypothesis", "Conclusion present but does not fully address hypothesis", "No conclusion or unrelated to experiment"],
    ]),

  t("Reading Response", "Evaluate comprehension, analysis, textual evidence, and writing quality.", "ELA", "3-8",
    true,
    ["Comprehension", "Analysis & Interpretation", "Textual Evidence", "Writing Quality"],
    std4,
    [
      ["Demonstrates deep understanding of the text", "Shows solid understanding of main ideas", "Shows basic understanding with some gaps", "Shows little understanding of the text"],
      ["Offers insightful, original interpretation", "Provides reasonable interpretation", "Interpretation is surface-level", "No interpretation or analysis present"],
      ["Multiple relevant quotes integrated smoothly", "Some quotes used to support ideas", "Limited textual evidence", "No textual evidence provided"],
      ["Well-written with strong voice and few errors", "Clear writing with minor errors", "Writing is understandable but has errors", "Difficult to understand; many errors"],
    ]),

  // === 45 PRO TEMPLATES ===
  // ELA
  t("Research Paper", "Comprehensive research paper assessment.", "ELA", "9-12", false,
    ["Thesis & Argument", "Sources & Citations", "Organization", "Writing Quality"],
    std4,
    [
      ["Original, arguable thesis with clear significance", "Clear thesis with adequate support", "Thesis present but underdeveloped", "No clear thesis"],
      ["5+ credible sources; perfect MLA/APA format", "3-4 credible sources; mostly correct format", "1-2 sources; inconsistent citations", "No credible sources or citations"],
      ["Seamless flow with strong transitions between ideas", "Logical organization with some transitions", "Some organization but lacking transitions", "No clear structure"],
      ["Sophisticated vocabulary; varied syntax; polished", "Clear and competent writing", "Basic writing with some clarity issues", "Unclear writing with frequent errors"],
    ]),
  t("Poetry Analysis", "Analyze poetic devices, theme, and interpretation.", "ELA", "7-12", false,
    ["Identification of Devices", "Theme Analysis", "Textual Evidence", "Interpretation"],
    std4,
    [
      ["Identifies and explains multiple poetic devices with insight", "Identifies several devices correctly", "Identifies some devices", "Cannot identify poetic devices"],
      ["Deep, nuanced understanding of theme(s)", "Identifies theme with explanation", "Basic theme identification", "Does not identify theme"],
      ["Strong quotes woven into analysis", "Quotes used to support points", "Limited use of text", "No textual evidence"],
      ["Original, sophisticated reading of the poem", "Reasonable interpretation supported by text", "Surface-level interpretation", "No personal interpretation"],
    ]),
  t("Persuasive Writing", "Assess arguments, counterarguments, and rhetorical strategy.", "ELA", "6-12", false,
    ["Argument Strength", "Counterarguments", "Rhetorical Appeals", "Conclusion"],
    std4,
    [
      ["Compelling, well-reasoned argument with strong evidence", "Clear argument with adequate evidence", "Argument present but weakly supported", "No clear argument"],
      ["Thoroughly addresses and refutes counterarguments", "Acknowledges counterarguments", "Briefly mentions opposition", "Ignores counterarguments"],
      ["Effective use of ethos, pathos, and logos", "Uses at least two appeals effectively", "Limited rhetorical strategy", "No rhetorical awareness"],
      ["Powerful call to action that follows from argument", "Clear concluding statement", "Weak conclusion", "No conclusion"],
    ]),
  t("Book Report", "Evaluate summary, analysis, and personal response.", "ELA", "3-6", false,
    ["Summary", "Character Analysis", "Personal Response", "Presentation"],
    std4,
    [
      ["Accurate, concise summary covering key plot points", "Mostly accurate summary", "Incomplete summary", "Inaccurate or missing summary"],
      ["Deep insight into character motivations and growth", "Describes character traits with examples", "Basic character description", "No character analysis"],
      ["Thoughtful, specific personal connections to the text", "Some personal connection expressed", "Minimal personal response", "No personal response"],
      ["Neat, creative, and engaging presentation", "Clean and organized presentation", "Somewhat organized", "Messy or incomplete"],
    ]),
  t("Creative Writing", "Assess narrative elements, voice, and craft.", "ELA", "4-12", false,
    ["Plot & Structure", "Character Development", "Voice & Style", "Conventions"],
    std4,
    [
      ["Engaging plot with clear arc and satisfying resolution", "Clear beginning, middle, and end", "Some plot structure but incomplete", "No discernible plot"],
      ["Complex, believable characters that grow", "Characters have distinct traits", "Flat or underdeveloped characters", "No character development"],
      ["Distinctive, consistent voice; strong word choice", "Clear voice with good word choice", "Inconsistent voice", "No sense of voice"],
      ["Near-perfect grammar and punctuation", "Minor errors", "Several errors", "Frequent errors impeding reading"],
    ]),
  // Math
  t("Math Problem Solving", "Evaluate mathematical reasoning and problem-solving process.", "Math", "3-12", false,
    ["Understanding", "Strategy", "Computation", "Communication"],
    std4,
    [
      ["Complete understanding of the problem and all its parts", "Substantial understanding", "Partial understanding", "Little to no understanding"],
      ["Efficient, elegant strategy that could work for similar problems", "Appropriate strategy chosen", "Strategy partially correct", "No strategy or inappropriate approach"],
      ["All computations correct with work shown", "Minor computational errors", "Several errors in computation", "Major errors or no work shown"],
      ["Clear, precise mathematical language and notation", "Adequate explanation of process", "Incomplete explanation", "No explanation of reasoning"],
    ]),
  t("Math Journal Entry", "Assess mathematical reflection and conceptual understanding.", "Math", "3-8", false,
    ["Conceptual Understanding", "Examples", "Reflection", "Vocabulary"],
    std4,
    [
      ["Explains concept in own words with deep understanding", "Explains concept adequately", "Partial explanation", "Cannot explain concept"],
      ["Multiple clear, original examples", "Correct example provided", "Example attempted but incorrect", "No examples"],
      ["Thoughtful reflection on learning process", "Some reflection present", "Minimal reflection", "No reflection"],
      ["Correct use of all relevant math vocabulary", "Most vocabulary used correctly", "Some vocabulary attempted", "No math vocabulary used"],
    ]),
  t("Geometry Proof", "Evaluate logical reasoning and proof structure.", "Math", "9-12", false,
    ["Given & Goal", "Logical Steps", "Justifications", "Completeness"],
    std4,
    [
      ["Clearly states given information and what is to be proved", "States given and goal", "Partially states given or goal", "Does not identify given or goal"],
      ["Each step follows logically from previous steps", "Most steps follow logically", "Some logical gaps", "Steps do not follow logically"],
      ["Every step has correct theorem/postulate citation", "Most steps justified", "Some justifications", "No justifications provided"],
      ["Proof is complete and reaches the conclusion", "Proof reaches conclusion with minor gaps", "Proof is incomplete", "Proof does not reach conclusion"],
    ]),
  // Science
  t("Science Fair Project", "Evaluate the full scientific method and presentation.", "Science", "4-12", false,
    ["Research Question", "Experimental Design", "Results & Analysis", "Presentation Board"],
    std4,
    [
      ["Original, focused question with clear variables identified", "Clear question with variables", "Question present but vague", "No clear research question"],
      ["Controlled experiment with detailed procedure", "Adequate experimental design", "Basic design with flaws", "No experimental design"],
      ["Data clearly presented with thorough statistical analysis", "Data presented with basic analysis", "Data incomplete or analysis weak", "No data or analysis"],
      ["Professional, visually appealing, and well-organized board", "Organized and neat board", "Board present but disorganized", "Board incomplete or missing"],
    ]),
  t("Scientific Poster", "Assess scientific communication via poster format.", "Science", "9-12", false,
    ["Abstract", "Methods & Results", "Visual Design", "Discussion"],
    std4,
    [
      ["Concise, complete abstract covering all key elements", "Adequate abstract", "Incomplete abstract", "No abstract"],
      ["Clear methods and well-presented results with figures", "Methods and results present", "Incomplete methods or results", "Missing methods or results"],
      ["Professional layout; effective use of figures and white space", "Clean layout with figures", "Cluttered or sparse layout", "Poor visual design"],
      ["Insightful discussion connecting results to broader context", "Discussion addresses results", "Superficial discussion", "No discussion"],
    ]),
  t("Ecology Field Study", "Assess field observation, data collection, and ecological reasoning.", "Science", "6-12", false,
    ["Field Observations", "Data Collection", "Ecological Concepts", "Report Writing"],
    std4,
    [
      ["Detailed, systematic observations with sketches or photos", "Good observations recorded", "Some observations noted", "Few or no observations"],
      ["Accurate, organized data with appropriate methods", "Data collected adequately", "Data incomplete or disorganized", "No data collected"],
      ["Connects findings to ecological principles and food webs", "References relevant concepts", "Basic ecological awareness", "No ecological connections"],
      ["Well-written report following scientific format", "Adequate report", "Report incomplete", "No report or very poor quality"],
    ]),
  // Social Studies
  t("Historical Essay", "Evaluate historical argumentation and use of primary sources.", "Social Studies", "8-12", false,
    ["Historical Argument", "Primary Sources", "Context & Analysis", "Writing"],
    std4,
    [
      ["Strong historical argument addressing cause and significance", "Clear argument with support", "Argument present but weak", "No historical argument"],
      ["Multiple primary sources analyzed critically", "Some primary sources used", "One source referenced", "No primary sources"],
      ["Rich historical context situating events accurately", "Adequate context provided", "Limited context", "No historical context"],
      ["Clear, formal writing appropriate for historical analysis", "Competent writing", "Writing has clarity issues", "Poor writing quality"],
    ]),
  t("Map Skills", "Assess geographic literacy and map interpretation.", "Social Studies", "3-8", false,
    ["Map Elements", "Location Skills", "Interpretation", "Application"],
    std4,
    [
      ["Correctly identifies and uses all map elements (key, scale, compass)", "Identifies most map elements", "Identifies some elements", "Cannot identify map elements"],
      ["Accurately locates places using coordinates and landmarks", "Locates most places correctly", "Locates some places", "Cannot locate places on map"],
      ["Draws insightful conclusions from map data", "Makes reasonable interpretations", "Basic interpretation", "Cannot interpret map information"],
      ["Applies map skills to solve real-world geography problems", "Applies skills to given problems", "Limited application", "Cannot apply map skills"],
    ]),
  t("Current Events Report", "Assess news literacy, summary, and critical analysis.", "Social Studies", "5-12", false,
    ["Source Selection", "Summary", "Analysis", "Connection"],
    std4,
    [
      ["Credible, relevant source clearly cited", "Adequate source cited", "Source of questionable credibility", "No source or unreliable"],
      ["Accurate, complete summary of key facts (who, what, when, where, why)", "Covers most key facts", "Incomplete summary", "Inaccurate or missing summary"],
      ["Thoughtful analysis of impact, bias, and multiple perspectives", "Some analysis present", "Surface-level analysis", "No analysis"],
      ["Strong connections to class content and historical patterns", "Some connection to class", "Weak connection", "No connection to class content"],
    ]),
  t("Debate Performance", "Evaluate argumentation, rebuttal, and speaking skills.", "Social Studies", "7-12", false,
    ["Opening Argument", "Evidence Use", "Rebuttal Skills", "Delivery"],
    std4,
    [
      ["Compelling opening that clearly states position", "Clear opening statement", "Vague opening", "No clear position stated"],
      ["Strong, varied evidence from credible sources", "Adequate evidence used", "Limited evidence", "No evidence cited"],
      ["Directly addresses opponent's points with counter-evidence", "Addresses some opponent points", "Weak rebuttals", "Does not address opponent"],
      ["Confident, persuasive delivery with eye contact", "Clear delivery", "Uneven delivery", "Difficult to follow"],
    ]),
  // Art
  t("Art Portfolio", "Assess artistic growth, technique, and creative vision.", "Art", "6-12", false,
    ["Technical Skill", "Creativity", "Artist Statement", "Presentation"],
    std4,
    [
      ["Demonstrates mastery of multiple techniques and media", "Good command of techniques", "Developing technique", "Limited technical skill"],
      ["Highly original concepts; takes creative risks", "Shows creativity and personal style", "Some creative elements", "No creative vision apparent"],
      ["Articulate reflection on process, influences, and growth", "Adequate statement explaining work", "Brief, vague statement", "No artist statement"],
      ["Professional presentation; cohesive collection", "Well-organized portfolio", "Somewhat organized", "Disorganized or incomplete"],
    ]),
  t("Art Critique", "Evaluate ability to describe, analyze, interpret, and judge art.", "Art", "5-12", false,
    ["Description", "Analysis", "Interpretation", "Judgment"],
    std4,
    [
      ["Detailed description of subject, media, and visual elements", "Adequate description", "Basic description", "No description"],
      ["Thorough analysis of principles of design used", "Identifies several design principles", "Identifies one principle", "No analysis of design"],
      ["Original, supported interpretation of meaning", "Reasonable interpretation", "Surface interpretation", "No interpretation"],
      ["Well-reasoned judgment using art vocabulary", "Expresses opinion with some reasoning", "Opinion without reasoning", "No judgment expressed"],
    ]),
  // Music
  t("Music Performance", "Assess musical performance quality and preparation.", "Music", "4-12", false,
    ["Pitch Accuracy", "Rhythm & Tempo", "Expression", "Stage Presence"],
    std4,
    [
      ["Consistently accurate pitch throughout", "Mostly accurate with minor errors", "Frequent pitch issues", "Cannot maintain pitch"],
      ["Steady tempo; accurate rhythmic patterns", "Generally steady with minor slips", "Uneven tempo; rhythm issues", "Cannot maintain rhythm"],
      ["Dynamic range and phrasing enhance the performance", "Some dynamic variation", "Minimal expression", "No musical expression"],
      ["Confident, professional stage presence", "Comfortable on stage", "Nervous but performs", "Unable to perform for audience"],
    ]),
  // Physical Education
  t("Physical Fitness Log", "Evaluate fitness tracking, goal-setting, and reflection.", "PE", "5-12", false,
    ["Consistency", "Goal Setting", "Data Recording", "Reflection"],
    std4,
    [
      ["Logged every session for the full period", "Missed 1-2 sessions", "Missed several sessions", "Very few entries"],
      ["SMART goals set and adjusted based on progress", "Clear goals set", "Vague goals", "No goals set"],
      ["Accurate, detailed records of activities, duration, and intensity", "Basic records kept", "Incomplete records", "No useful data recorded"],
      ["Thoughtful reflection on progress and next steps", "Some reflection present", "Minimal reflection", "No reflection"],
    ]),
  t("Team Sport Skills", "Assess individual skills, teamwork, and sportsmanship.", "PE", "3-12", false,
    ["Skill Execution", "Game Awareness", "Teamwork", "Sportsmanship"],
    std4,
    [
      ["Executes skills with precision and consistency", "Performs skills adequately", "Developing skill execution", "Struggles with basic skills"],
      ["Reads the game; positions effectively; anticipates plays", "Good awareness of game flow", "Some awareness", "Little game awareness"],
      ["Actively communicates and supports teammates", "Works with team", "Limited teamwork", "Does not cooperate with team"],
      ["Excellent sportsmanship; encourages others; follows all rules", "Good sportsmanship", "Occasional poor sportsmanship", "Frequent poor sportsmanship"],
    ]),
  // Technology
  t("Website Design", "Evaluate web design for usability, aesthetics, and content.", "Technology", "6-12", false,
    ["Layout & Navigation", "Visual Design", "Content Quality", "Functionality"],
    std4,
    [
      ["Intuitive navigation; consistent, well-organized layout", "Clear navigation and layout", "Navigation works but confusing", "Poor navigation; lost easily"],
      ["Professional color scheme, typography, and imagery", "Pleasant visual design", "Basic or inconsistent design", "Poor visual design"],
      ["Well-written, error-free content that serves the purpose", "Adequate content", "Content incomplete or has errors", "Content missing or very poor"],
      ["All links work; site loads fast; works on mobile", "Most features work", "Some broken elements", "Site does not function properly"],
    ]),
  t("Coding Project", "Assess code quality, functionality, and documentation.", "Technology", "7-12", false,
    ["Functionality", "Code Quality", "User Interface", "Documentation"],
    std4,
    [
      ["All features work correctly; handles edge cases", "Core features work", "Some features work", "Program does not run"],
      ["Clean, well-organized code with good naming", "Readable code with some organization", "Code works but messy", "Unreadable code"],
      ["Polished, intuitive interface", "Functional interface", "Basic interface", "No interface design consideration"],
      ["Clear README, comments, and instructions", "Some documentation", "Minimal documentation", "No documentation"],
    ]),
  // World Languages
  t("Foreign Language Speaking", "Assess oral proficiency in a world language.", "World Languages", "6-12", false,
    ["Pronunciation", "Vocabulary", "Grammar", "Fluency"],
    std4,
    [
      ["Native-like pronunciation and intonation", "Clear pronunciation; minor accent", "Understandable but noticeable errors", "Difficult to understand"],
      ["Rich, varied vocabulary appropriate to topic", "Adequate vocabulary", "Limited vocabulary; frequent pauses to search", "Very limited vocabulary"],
      ["Accurate grammar with complex structures", "Generally correct grammar", "Frequent grammar errors", "Grammar impedes communication"],
      ["Speaks smoothly with natural pace", "Occasional hesitation", "Frequent pauses and self-correction", "Cannot sustain conversation"],
    ]),
  t("Foreign Language Writing", "Evaluate written proficiency in a world language.", "World Languages", "6-12", false,
    ["Content & Ideas", "Vocabulary & Idioms", "Grammar & Syntax", "Organization"],
    std4,
    [
      ["Rich, engaging content with cultural awareness", "Clear content on topic", "Basic content", "Off-topic or incomprehensible"],
      ["Sophisticated vocabulary with idiomatic expressions", "Appropriate vocabulary", "Basic vocabulary; repetitive", "Very limited vocabulary"],
      ["Accurate complex grammar; varied sentence structure", "Generally correct grammar", "Frequent errors; simple sentences only", "Pervasive errors"],
      ["Well-organized with clear introduction and conclusion", "Mostly organized", "Some organization", "No clear organization"],
    ]),
  // Health
  t("Health Project", "Assess health topic research, presentation, and awareness.", "Health", "5-12", false,
    ["Research Quality", "Accuracy", "Presentation", "Personal Application"],
    std4,
    [
      ["Thorough research from credible health sources", "Adequate research", "Limited research", "No credible research"],
      ["All health information is accurate and current", "Mostly accurate", "Some inaccuracies", "Contains misinformation"],
      ["Engaging, clear, and well-organized presentation", "Clear presentation", "Basic presentation", "Unclear or disorganized"],
      ["Meaningful personal connections and action plan", "Some personal connection", "Minimal application", "No personal relevance shown"],
    ]),
  // Career & Technical Education
  t("Resume & Cover Letter", "Evaluate professional documents for job readiness.", "CTE", "9-12", false,
    ["Format & Layout", "Content Accuracy", "Tailoring", "Professionalism"],
    std4,
    [
      ["Clean, professional format following industry standards", "Adequate format", "Inconsistent formatting", "Poor formatting"],
      ["All information accurate; quantified achievements", "Information accurate", "Some inaccuracies or vagueness", "Inaccurate or missing information"],
      ["Clearly tailored to specific job posting", "Some customization evident", "Generic application", "No customization"],
      ["Error-free; professional tone throughout", "Minor errors; professional tone", "Several errors; inconsistent tone", "Many errors; unprofessional tone"],
    ]),
  // Elementary-specific
  t("Show and Tell", "Evaluate young students' sharing and speaking skills.", "General", "K-2", false,
    ["Speaking Voice", "Eye Contact", "Content", "Listening"],
    std4,
    [
      ["Loud, clear voice that everyone can hear", "Most students can hear", "Quiet voice; hard to hear", "Cannot hear the speaker"],
      ["Looks at audience throughout", "Looks at audience most of the time", "Sometimes looks at audience", "Does not look at audience"],
      ["Shares interesting details and answers questions", "Shares some details", "Shares but very brief", "Does not share about item"],
      ["Listens quietly and respectfully to all speakers", "Listens to most speakers", "Sometimes listens", "Does not listen to others"],
    ]),
  t("Handwriting", "Assess letter formation, spacing, and neatness.", "ELA", "K-3", false,
    ["Letter Formation", "Size Consistency", "Spacing", "Neatness"],
    std4,
    [
      ["All letters formed correctly on the line", "Most letters formed correctly", "Some letters formed correctly", "Letters are not recognizable"],
      ["All letters are the same appropriate size", "Most letters consistent size", "Sizes vary considerably", "No size consistency"],
      ["Even spacing between letters and words", "Mostly even spacing", "Uneven spacing", "No spacing between words"],
      ["Paper is clean; writing is easy to read", "Generally neat work", "Somewhat messy", "Very difficult to read"],
    ]),
  t("Coloring & Drawing", "Assess fine motor skills through coloring and drawing.", "Art", "K-2", false,
    ["Staying in Lines", "Color Choices", "Effort", "Creativity"],
    std4,
    [
      ["Colors neatly within all lines", "Mostly within lines", "Sometimes goes outside lines", "Does not try to stay in lines"],
      ["Thoughtful, varied color choices", "Uses several colors", "Uses very few colors", "Uses only one color or none"],
      ["Clearly spent time and took care", "Good effort shown", "Rushed work", "Very little effort"],
      ["Adds creative details beyond requirements", "Some creative elements", "Follows directions only", "Incomplete work"],
    ]),
  // More secondary
  t("Annotated Bibliography", "Evaluate source selection, annotation quality, and format.", "ELA", "9-12", false,
    ["Source Credibility", "Summary", "Evaluation", "Citation Format"],
    std4,
    [
      ["All sources are scholarly and directly relevant", "Most sources credible and relevant", "Mixed quality sources", "Unreliable sources"],
      ["Clear, concise summary of each source's argument", "Adequate summaries", "Incomplete summaries", "No summaries"],
      ["Thoughtful evaluation of each source's usefulness", "Some evaluation present", "Minimal evaluation", "No evaluation"],
      ["Perfect MLA/APA format for all entries", "Minor formatting errors", "Significant formatting errors", "No consistent format"],
    ]),
  t("Multimedia Presentation", "Assess digital presentation skills and media integration.", "Technology", "5-12", false,
    ["Content Accuracy", "Media Integration", "Design & Layout", "Technical Execution"],
    std4,
    [
      ["All facts accurate; well-researched from credible sources", "Mostly accurate content", "Some inaccuracies", "Inaccurate content"],
      ["Purposeful images, video, and audio that enhance message", "Media supports content", "Media present but disconnected", "No media or irrelevant media"],
      ["Consistent, professional design; readable text", "Clean design", "Inconsistent design", "Cluttered or unreadable"],
      ["Smooth transitions; all media plays correctly", "Most elements work", "Some technical issues", "Significant technical problems"],
    ]),
  t("Science Notebook", "Evaluate scientific documentation and thinking.", "Science", "3-8", false,
    ["Daily Entries", "Diagrams & Labels", "Vocabulary", "Questions & Predictions"],
    std4,
    [
      ["Complete, dated entries for every class", "Most entries complete", "Some entries missing", "Very few entries"],
      ["Accurate, detailed, labeled diagrams", "Diagrams with labels", "Basic diagrams; few labels", "No diagrams"],
      ["All vocabulary defined and used in context", "Most vocabulary recorded", "Some vocabulary", "No vocabulary recorded"],
      ["Thoughtful questions and testable predictions", "Some questions present", "Basic questions", "No questions or predictions"],
    ]),
  t("Paragraph Writing", "Assess basic paragraph structure for younger students.", "ELA", "3-5", false,
    ["Topic Sentence", "Supporting Details", "Closing Sentence", "Conventions"],
    std4,
    [
      ["Clear topic sentence that states the main idea", "Topic sentence present", "Unclear topic sentence", "No topic sentence"],
      ["3+ specific details that support the topic", "2 supporting details", "1 supporting detail", "No supporting details"],
      ["Strong closing that restates idea in a new way", "Closing sentence present", "Weak closing", "No closing sentence"],
      ["Correct spelling, capitalization, and punctuation", "Few errors", "Several errors", "Many errors"],
    ]),
  t("Classroom Participation", "Track daily engagement and learning behaviors.", "General", "K-12", false,
    ["Engagement", "Preparation", "Contributions", "Respect"],
    std4,
    [
      ["Actively focused and involved in all activities", "Focused most of the time", "Sometimes distracted", "Frequently off-task"],
      ["Always prepared with materials and completed homework", "Usually prepared", "Sometimes unprepared", "Rarely prepared"],
      ["Frequently offers thoughtful ideas and questions", "Contributes when asked", "Rarely contributes", "Does not participate"],
      ["Respectful to teacher and all classmates at all times", "Usually respectful", "Occasionally disrespectful", "Frequently disrespectful"],
    ]),
  t("STEM Challenge", "Evaluate engineering design process and problem solving.", "Science", "3-8", false,
    ["Design Process", "Prototype", "Testing & Iteration", "Teamwork"],
    std4,
    [
      ["Follows full design process with detailed planning", "Follows most design steps", "Skips some design steps", "No design planning"],
      ["Functional prototype that meets all constraints", "Prototype meets most constraints", "Prototype partially works", "No functional prototype"],
      ["Multiple test rounds with documented improvements", "Tested and made improvements", "Tested once", "Did not test or iterate"],
      ["Collaborates effectively; shares responsibilities", "Works with team", "Limited teamwork", "Does not work with team"],
    ]),
  t("Literature Circle Role", "Assess reading group role completion and discussion.", "ELA", "4-8", false,
    ["Role Completion", "Text References", "Discussion", "Listening"],
    std4,
    [
      ["Role sheet fully complete with deep thinking", "Role sheet complete", "Partially complete", "Not completed"],
      ["Multiple specific page references with quotes", "Some text references", "Vague references", "No text references"],
      ["Leads meaningful discussion; asks probing questions", "Contributes to discussion", "Participates minimally", "Does not contribute"],
      ["Actively listens; builds on others' ideas", "Listens to others", "Sometimes listens", "Does not listen"],
    ]),
  t("Social Studies Fair", "Evaluate historical research display and presentation.", "Social Studies", "4-12", false,
    ["Research Depth", "Display Board", "Bibliography", "Interview/Presentation"],
    std4,
    [
      ["Extensive research from varied primary and secondary sources", "Good research from multiple sources", "Basic research from few sources", "Insufficient research"],
      ["Eye-catching, organized display with visuals and artifacts", "Neat, organized display", "Basic display", "Messy or incomplete display"],
      ["Complete, properly formatted bibliography with 5+ sources", "Bibliography with 3-4 sources", "Brief bibliography", "No bibliography"],
      ["Confident, knowledgeable presentation or interview", "Good presentation", "Basic presentation", "Cannot discuss project"],
    ]),
  t("Math Word Problems", "Assess problem-solving process for word problems.", "Math", "2-6", false,
    ["Understanding the Problem", "Choosing a Strategy", "Solving", "Checking Work"],
    std4,
    [
      ["Identifies all important information and the question", "Identifies key information", "Identifies some information", "Cannot determine what to find"],
      ["Selects efficient strategy (diagram, equation, table, etc.)", "Selects appropriate strategy", "Attempts a strategy", "No strategy selected"],
      ["Correct answer with all work clearly shown", "Correct answer with some work", "Incorrect but reasonable attempt", "No work shown"],
      ["Checks answer using different method; answer is reasonable", "Checks answer", "Answer not checked", "Answer is unreasonable"],
    ]),
  t("Digital Citizenship", "Evaluate understanding of online safety and responsibility.", "Technology", "3-8", false,
    ["Online Safety", "Digital Footprint", "Cyberbullying Awareness", "Information Literacy"],
    std4,
    [
      ["Explains how to protect personal info and recognize threats", "Understands basic online safety", "Some awareness", "No understanding of online safety"],
      ["Understands permanence of online actions; manages presence", "Aware of digital footprint", "Basic awareness", "No awareness"],
      ["Can identify, respond to, and report cyberbullying", "Can identify cyberbullying", "Basic awareness", "Does not understand cyberbullying"],
      ["Evaluates sources critically; understands bias", "Can determine if source is credible", "Basic source awareness", "Cannot evaluate sources"],
    ]),
  t("Graphic Organizer", "Assess use of graphic organizers for planning and thinking.", "General", "2-8", false,
    ["Completeness", "Organization", "Details", "Connections"],
    std4,
    [
      ["All sections filled with relevant information", "Most sections complete", "Some sections empty", "Mostly empty"],
      ["Clear, logical organization of ideas", "Generally organized", "Some organization", "No organization"],
      ["Rich, specific details in each section", "Some details present", "Vague entries", "No meaningful details"],
      ["Clear connections and relationships between ideas shown", "Some connections visible", "Few connections", "No connections between ideas"],
    ]),
  t("Exit Ticket", "Quick formative assessment of lesson comprehension.", "General", "2-12", false,
    ["Key Concept", "Explanation", "Example", "Self-Assessment"],
    std4,
    [
      ["Accurately states the key concept in own words", "States the concept", "Partially states concept", "Cannot state concept"],
      ["Clear, detailed explanation showing understanding", "Basic explanation", "Vague explanation", "No explanation"],
      ["Provides original, correct example", "Provides a correct example", "Attempts an example", "No example"],
      ["Honestly reflects on understanding; identifies next steps", "Reflects on understanding", "Vague self-assessment", "No self-assessment"],
    ]),
  t("Socratic Seminar", "Assess discussion-based learning and critical inquiry.", "General", "7-12", false,
    ["Preparation", "Contributions", "Use of Evidence", "Active Listening"],
    std4,
    [
      ["Thoroughly annotated text with prepared questions and notes", "Text annotated with some notes", "Minimal preparation", "Unprepared"],
      ["Multiple substantive contributions that advance discussion", "Several relevant contributions", "One contribution", "Does not contribute"],
      ["Consistently cites text to support claims", "Sometimes references text", "Rarely uses evidence", "Never uses evidence"],
      ["Builds on others' ideas; asks follow-up questions", "Responds to others", "Listens but does not respond", "Does not listen to others"],
    ]),
];
