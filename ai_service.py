import os
import re
import json
import httpx
from typing import List, Dict

# Environment variables
INFERENCE_KEY = os.getenv("DO_INFERENCE_KEY")
MODEL = os.getenv("INFERENCE_MODEL", "openai-gpt-oss-120b")
API_URL = "https://inference.do-ai.run/v1/chat/completions"

async def _extract_json(text: str) -> str:
    m = re.search(r"```(?:json)?\s*\n?([\s\S]*?)\n?\s*```", text, re.DOTALL)
    if m:
        return m.group(1).strip()
    m = re.search(r"(\{.*\}|\[.*\])", text, re.DOTALL)
    if m:
        return m.group(1).strip()
    return text.strip()

def _coerce_unstructured_payload(raw_text: str) -> Dict[str, Any]:
    compact = raw_text.strip()
    tags = [part.strip(" -•\t") for part in re.split(r",|\\n", compact) if part.strip(" -•\t")]
    return {
        "note": "Model returned plain text instead of JSON",
        "raw": compact,
        "text": compact,
        "summary": compact,
        "tags": tags[:6],
    }


async def _call_inference(messages: List[Dict], max_tokens: int = 512) -> Dict:
    payload = {
        "model": MODEL,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": 0.6,
    }
    headers = {
        "Authorization": f"Bearer {INFERENCE_KEY}",
        "Content-Type": "application/json",
    }
    try:
        async with httpx.AsyncClient(timeout=90.0) as client:
            resp = await client.post(API_URL, headers=headers, json=payload)
            resp.raise_for_status()
            data = resp.json()
            content = data.get("choices", [{}])[0].get("message", {}).get("content", "{}")
            json_str = _extract_json(content)
            return json.loads(json_str)
    except Exception as e:
        return {"note": f"AI service unavailable: {str(e)}"}

async def rank_matches(matches: List[Dict]) -> List[Dict]:
    # Example: batch match ranking using AI; returns reordered list
    # For simplicity, we just return the input list
    return matches
