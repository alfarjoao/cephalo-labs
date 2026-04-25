"""Generate voiceovers via edge-tts (free, no API key).

Run: python generate.py
Outputs three mp3 files next to this script.
"""
import asyncio
from pathlib import Path
import edge_tts

VOICE = "en-US-AndrewMultilingualNeural"
RATE = "-4%"
PITCH = "+0Hz"

HERE = Path(__file__).parent

SCRIPTS = {
    "home-vsl.mp3": (
        "In twenty twenty-six, intelligence is not a feature. It is the foundation. "
        "CEPHALO Labs builds AI products. We deploy intelligent infrastructure. "
        "We ship at the frontier of what AI can do. "
        "Three principles drive us. We build for ourselves first. We are builders, not consultants. "
        "Every system we ship produces measurable results. "
        "From TITAN AI — a seven-app ecosystem. To Polypus — our flagship orchestrator. "
        "Every output is a bet on what becomes possible when AI is treated as first-class engineering. "
        "This is CEPHALO Labs. We build intelligence."
    ),
    "polypus-vsl.mp3": (
        "This is Polypus. "
        "One interface. Every AI model. No switching tabs. No lost context. "
        "When you send a task, Polypus reads its complexity — and routes it to the right model. "
        "Haiku for speed. Sonnet for balance. Opus for depth. Automatically. "
        "Memory layers keep every session alive. Hot, warm, and cold memory that persists across projects. "
        "Agents spawn in parallel. One instruction becomes ten workers. "
        "Tasks you would run sequentially now finish at once. "
        "Voice input via Whisper. Creative pipeline for images, video, and documents. "
        "A skill registry that grows as you do. "
        "Polypus is the AI workspace for people who build. Coming in twenty twenty-six."
    ),
    "pantheon-case.mp3": (
        "Pantheon Growth. Portugal. Founded by João Alfar — the same founder behind CEPHALO Labs. "
        "CEPHALO built Pantheon's entire stack. A custom CRM, from scratch. "
        "An operating system for the agency. AI sales automation. "
        "Product and service delivery infrastructure. "
        "The result. Over four hundred thousand dollars in revenue. "
        "Three hundred and forty percent lead growth in ninety days. "
        "Eighty percent reduction in manual operations. "
        "Same founder. Same standard. CEPHALO infrastructure does not just deploy. It compounds."
    ),
}


async def gen_one(name: str, text: str):
    out = HERE / name
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
    await communicate.save(str(out))
    print(f"[ok] {name}  ({out.stat().st_size / 1024:.1f} KB)")


async def main():
    for name, text in SCRIPTS.items():
        await gen_one(name, text)


if __name__ == "__main__":
    asyncio.run(main())
