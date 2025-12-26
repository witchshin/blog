export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About</h1>
      <div className="prose-custom bg-white rounded-lg shadow-md p-8">
        <p className="text-lg text-gray-700 mb-4">
          안녕하세요! 이 블로그는 정적 사이트 생성기를 사용하여 만들어졌습니다.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          마크다운으로 글을 작성하고, 태그와 카테고리로 분류하여 관리할 수 있습니다.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">기술 스택</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>React + TypeScript</li>
          <li>Vite</li>
          <li>Tailwind CSS</li>
          <li>React Router</li>
          <li>Remark (마크다운 처리)</li>
        </ul>
      </div>
    </div>
  );
}

