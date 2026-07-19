import type { GeneratorConstraints } from '@/domain/schemes/maps/generator-constraints-scheme';
import { DEPTH_TARGET } from '@/domain/schemes/maps/generator-constraints-scheme';
import type { BookCandidate } from '@/domain/entities/bookAPI/bookCandidate';

export const systemPrompt = `You are an expert learning-path architect and bibliographic curator.
Given a topic, you design ONE coherent reading path that takes a motivated learner from foundations to advanced mastery.

INPUT: The user's topic may arrive in ANY language or alphabet. Understand it in its original language, but ALWAYS write topic, description, and every book field in English (US). Never mirror the input language in the output. Keep book titles in their canonical cataloged form (which may be non-English if that is the book's real published title).

Rules:
1. SELECTION: Select the number of books requested in the per-request instructions (default 4-6).
2. REAL BOOKS ONLY: Every book must be a real, published, widely-cataloged title. Strongly prefer well-known, in-print, industry-standard works with a modern edition that carries an ISBN. Each title is looked up by name in the Google Books catalog and any book that cannot be matched to an ISBN is discarded, so never invent books, authors, or editions. Avoid obscure, out-of-print, or public-domain-only titles that may lack a catalog ISBN; if you are not confident a book exists as an ISBN-bearing edition, choose a more canonical alternative.
3. TITLES: Use the exact, commonly-cataloged book title and its primary author so the book is easy to match. Do not paraphrase titles or invent subtitles.
4. ORDER: Sequence by increasing difficulty and dependency. Position 1 assumes no prior knowledge; every later book builds on skills the previous ones establish.
5. LEVEL: Label each book with exactly one of: Beginner, Intermediate, Advanced.
6. REASONING: For book_value, state why THIS book is the right next step at THIS point, naming the specific concepts or skills it delivers (no generic praise). For next_path, name the concrete skill or subtopic it unlocks and prepares the reader for next.
7. QUALITY: Favor books recognized as authoritative or with an exceptional pedagogical approach.

For topic, restate the user's subject as a clear, well-scoped title. For description, write 1-2 sentences framing what the path teaches and who it is for.`;

const LEVEL_FRAGMENT: Record<GeneratorConstraints['readerLevel'], string> = {
    novice: 'This reader is new to the topic and needs approachable, foundational books.',
    intermediate: 'This reader has working knowledge and is ready for deeper, more technical books.',
    advanced: 'This reader is experienced and wants authoritative, advanced-level books.',
};

const GOAL_FRAGMENT: Record<GeneratorConstraints['goal'], string> = {
    practical: 'Prioritize hands-on, applied books the reader can put into practice.',
    academic: 'Prioritize rigorous, theory-driven books suited for formal study.',
    overview: 'Prioritize broad, accessible books that survey the topic without excessive depth.',
};

export const LANG_FRAGMENT: Record<GeneratorConstraints['bookLanguage'], string> = {
    en: 'English',
    es: 'Spanish',
};

export function buildUserPrompt(theme: string, constraints: GeneratorConstraints): string {
    return `Design the reading path for this topic: ${theme}

Learner profile:
- Reader level: ${LEVEL_FRAGMENT[constraints.readerLevel]}
- Goal: ${GOAL_FRAGMENT[constraints.goal]}
- Prefer book editions in: ${LANG_FRAGMENT[constraints.bookLanguage]}
- Select exactly ${DEPTH_TARGET[constraints.depth]} books (this overrides the default 4-6 range).`;
}

// RAG rescue curation: Gemini selects/orders from a closed, ISBN-verified candidate pool. Never invents titles.
export function buildCurationPrompt(
    topic: string,
    candidates: BookCandidate[],
    needed: number,
    constraints: GeneratorConstraints
): string {
    const candidateList = candidates
        .map(c => `- "${c.title}" by ${c.author} (ISBN ${c.isbn})`)
        .join('\n');

    return `The reading path for "${topic}" needs ${needed} more book(s).

Select and order EXACTLY ${needed} book(s) from the following CLOSED CANDIDATE LIST ONLY. Never invent a title or author outside this list. Use each selected candidate's exact title and author as given below.

Candidates:
${candidateList}

Learner profile:
- Reader level: ${LEVEL_FRAGMENT[constraints.readerLevel]}
- Goal: ${GOAL_FRAGMENT[constraints.goal]}
- Prefer book editions in: ${LANG_FRAGMENT[constraints.bookLanguage]}

For each selected book, still provide level (exactly one of: Beginner, Intermediate, Advanced), book_value (why this book is the right next step at this point, naming specific concepts or skills), and next_path (the concrete skill or subtopic it unlocks).`;
}