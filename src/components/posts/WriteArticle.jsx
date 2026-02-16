import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router";
import { useCreateArticle } from "../../hooks/articles/useArticles";
import { usePublishArticle } from "../../hooks/articles/useArticles";
const defaultSection = {
  section_type: "introduction",
  title: "",
  content: "",
  order: 0,
};

export default function WriteArticle() {
  const navigate = useNavigate();
  const { save } = useCreateArticle();
  const { publish } = usePublishArticle();

  const [form, setForm] = useState({
    title: "",
    specialization: "",
    abstract: "",
    acknowledgements: "",
    author_contributions: "",
    funding: "",
    competing_interests: "",
    disclosures_ethics: "",
    sections: [{ ...defaultSection }],
  });

  const handleSectionChange = (index, key, value) => {
    const updated = [...form.sections];
    updated[index][key] = value;
    setForm({ ...form, sections: updated });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        { ...defaultSection, order: form.sections.length },
      ],
    });
  };

  const handleSubmit = async (publishNow = false) => {
    const article = await save(null, form);
    if (publishNow) {
      await publish(article.id);
    }
    navigate("/articles");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Write Scientific Article</h1>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Article Title"
        className="w-full border p-2 mb-3"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* SPECIALIZATION */}
      <input
        type="text"
        placeholder="Specialization (AI, Biology...)"
        className="w-full border p-2 mb-3"
        value={form.specialization}
        onChange={(e) =>
          setForm({ ...form, specialization: e.target.value })
        }
      />

      {/* ABSTRACT */}
      <textarea
        placeholder="Abstract"
        className="w-full border p-2 mb-4"
        value={form.abstract}
        onChange={(e) =>
          setForm({ ...form, abstract: e.target.value })
        }
      />

      {/* SECTIONS */}
      <h2 className="text-lg font-semibold mb-2">Sections</h2>

      {form.sections.map((section, index) => (
        <div key={index} className="border p-4 mb-4 rounded">
          <select
            className="border p-2 mb-2 w-full"
            value={section.section_type}
            onChange={(e) =>
              handleSectionChange(index, "section_type", e.target.value)
            }
          >
            <option value="introduction">Introduction</option>
            <option value="materials_methods">Materials & Methods</option>
            <option value="results">Results</option>
            <option value="discussion">Discussion</option>
            <option value="conclusion">Conclusion</option>
            <option value="custom">Custom</option>
          </select>

          <input
            type="text"
            placeholder="Section Title"
            className="w-full border p-2 mb-2"
            value={section.title}
            onChange={(e) =>
              handleSectionChange(index, "title", e.target.value)
            }
          />

          <Editor
            apiKey="gzbaq6k6otgk5w4c2vhnm06gksbkpyt5ahllriq2s49rj3ty"
            value={section.content}
            onEditorChange={(value) =>
              handleSectionChange(index, "content", value)
            }
            init={{
              height: 250,
              menubar: false,
              plugins: "lists link image table code fullscreen",
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image table | code fullscreen",
            }}
          />
        </div>
      ))}

      <button
        onClick={addSection}
        className="bg-gray-200 px-4 py-2 rounded mb-4"
      >
        + Add Section
      </button>

      {/* SUBMIT */}
      <div className="flex gap-4">
        <button
          onClick={() => handleSubmit(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Draft
        </button>

        <button
          onClick={() => handleSubmit(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
}