# Contributing to HireMind

Thank you for your interest in contributing to HireMind! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/Hire_Job.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Resume Matcher
```bash
cd resume-matcher
pip install -r requirements.txt
uvicorn main:app --reload
```

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Code Style

- **TypeScript**: Use strict mode, prefer interfaces over types
- **CSS**: Use CSS Modules, follow BEM naming
- **Python**: Follow PEP 8, use type hints

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update the README if adding features
4. Request review from maintainers

## Questions?

Open an issue for any questions or concerns.
